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
export default Changepass;