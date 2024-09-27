import React, { useState } from "react";
import "./Login.css";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import CanvasScene from "./CanvasScene";
function Login() {
  const [action, setAction] = useState("");
  const registrationLink = () => {
    setAction(" active");
  };
  const loginLink = () => {
    setAction("");
  };
  return (
    <>
      <CanvasScene />
      <div className={`wrapper${action}`}>
        <div className="form-box login">
          <form action="">
            <h1 className="font-bold">Login</h1>
            <div className="input-box">
              <input type="text" placeholder="Username" required />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Password" required />
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
          <form action="">
            <h1 className="font-bold">Registration</h1>
            <div className="input-box">
              <input type="text" placeholder="Username" required />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input type="email" placeholder="Email" required />
              <FaEnvelope className="icon" />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Password" required />
              <FaLock className="icon" />
            </div>
            <div className="remember-forgot">
              <label htmlFor="">
                <input type="checkbox" />I agree to the terms & conditions
              </label>
            </div>
            <button type="submit">Register</button>
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
