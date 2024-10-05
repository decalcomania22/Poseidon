import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function Changepass(){
    const [data,setdata]=useState(null);
    const [ip,setip]=useState(null);
    useEffect(() => {
        const fetchData = async () => {

            const response = await axios.get("http://localhost:3000/");
            // Check if the request was successful
            // Parse the response data into JSON format
            console.log(response);
            // Update the state with the fetched data
            setdata(response);
        };
        fetchData();
      }, []);
    // const {id}=useParams();
    // const {verifyuserid}=axios.get(`http://localhost:3000/${id}/updatepass`);
    // const {ip,setip}=useState(null);
    const handleinput=(e)=>{
        e.preventDefault();
        setip(e.target.value);
    }
    const submitotp=async(e)=>{
        e.preventDefault();
        const response=await axios.post(`http://localhost:3000/${verifyuserid}/updatepass`,{tempotp:ip});
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
export default Changepass;