import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function Otp(){
    const {verifyuserid}=useParams();
    console.log(verifyuserid);
    const[ip,setip]=useState(null);
    const handleinput=(e)=>{
        setip(e.target.value);
    }
    const submitotp=async(e)=>{
        e.preventDefault();
        const response=await axios.post(`http://localhost:3000/${verifyuserid}/emailverification`,{tempotp:ip});
        if(response.status==201){
            window.location.href="/home";
        }else{
            console.log("some error occured");
        }
    }
    return(
        <>
  <form onSubmit={submitotp} className="bg-gray-200 p-6 rounded-lg shadow-md max-w-sm mx-auto">
    <div className="mb-4">
      <label htmlFor="tempotp" className="block text-gray-800 font-medium mb-2">
        Enter OTP here
      </label>
      <input
        name="tempotp"
        id="tempotp"
        type="password"
        onChange={handleinput}
        value={ip}
        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
        placeholder="Enter OTP"
      />
    </div>
    <button
      type="submit"
      className="w-full bg-gray-800 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
    >
      Submit
    </button>
  </form>
</>

    )
}
export default Otp;