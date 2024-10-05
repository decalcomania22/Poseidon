import React, { useState } from "react";
import "./Login.css";
import { FaEnvelope, FaUser, FaLock } from "react-icons/fa";
import CanvasScene from "./CanvasScene";
import axios from "axios";
function Login() {
  const [action, setAction] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  // Switch between login and register forms
  const registrationLink = () => {
    setAction(" active");
  };
  const loginLink = () => {
    setAction("");
  };

  // Handle Login Submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", { username, password });
      console.log(response.data);
      // if (response.data) {
      //   // Redirect user to the homepage or the required page after login
      //   window.location.href = `/${response.data.verifyuserId}/emailverification`;
      // }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Handle Registration Submission
  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/signup", { username, password, name });
      console.log(response);
      if (response.status==201) {
        // Redirect to email verification
        window.location.href=`/otp/${response.data.verifyuserid}`;
      }else if(response.status==400){
        console.log("duplicate user");
      }else if(response.status==500){
        console.log("error");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  const handlegooglesignup=async(e)=>{
    e.preventDefault();
    window.location.href = 'http://localhost:3000/auth/google';
    // if(response.status==201){
    //     window.location.href=`/otp/${response.data.verifyuserid}`;
    //     }else if(response.status==400){
    //       console.log("duplicate user");
    //     }else if(response.status==500){
    //       console.log("error");
    //     }
    }
    const hanelegooglelogin=async(e)=>{
      e.preventDefault();
      window.location.href = 'http://localhost:3000/auth/google';
    }
  return (
    <>
      <CanvasScene />
      <div className={`wrapper${action}`}>
        <div className="form-box login">
          <form onSubmit={handleLogin}>
            <h1 className="font-bold">Login</h1>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FaEnvelope className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="icon" />
            </div>
            <div className="remember-forgot">
              <label htmlFor="">
                <input type="checkbox" />
                Remember Me
              </label>
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit">Login</button>
            <div className="mt-5">
          <button onClick={hanelegooglelogin}>Login With google</button>
        </div>
            <div className="register-link">
              <p>
                Don't have an account?{" "}
                <a href="#" onClick={registrationLink}>
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>

        <div className="form-box register">
          <form onSubmit={handleRegistration}>
            <h1 className="font-bold">Registration</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FaEnvelope className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="icon" />
            </div>
            <div className="remember-forgot">
              <label htmlFor="">
                <input type="checkbox" />I agree to the terms & conditions
              </label>
            </div>
            <button type="submit">Register</button>
            <div className="mt-3">
          <button onClick={handlegooglesignup}>signup With google</button>
        </div>
            <div className="register-link">
              <p>
                Already have an account?{" "}
                <a href="#" onClick={loginLink}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
