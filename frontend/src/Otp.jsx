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
        <form onSubmit={submitotp}>
        <label htmlFor="tempotp">Enter Otp here</label>
            <input name="tempotp" id="tempotp" type="password" onChange={handleinput} value={ip} ></input>
        <button type="submit">Submit</button>
        </form>
        </>
    )
}
export default Otp;