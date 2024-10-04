import React from 'react'
import stockvideo from '../assets/text.mp4'
import Navbar from '../components/navbar.jsx'
import { useState } from 'react'
import axios from 'axios';
//import SearchResult from './search_result.jsx';
import { useNavigate } from 'react-router-dom'; 

function Homepage() {

//  const [searchedcompany,setSearchByCompany]=useState({
//   company:"",

//  });
const [searchedcompany,setSearchByCompany]=useState("");
const [searchedcountry,setSearchByCountry]=useState("");
const [companyResults,setCompanyResults]=useState([]);
// const [searchsubmit,setSearchSubmit]=usestate(false);
const navigate = useNavigate();






const handleSearchByCountry=(e)=>{
  e.preventDefault();
  axios.get(`/countries/searchbycountry?country=${searchedcountry}`)
    .then((res) => {
        
        setCountryResults(res.data);
        console.log(res.data);
        navigate('/searchresult', { state: { countryResults: res.data } }); 
        // setSearchSubmit(true);
        
       
    })
    .catch(error => {
        console.log(error); // Log any error that occurs during the API request
    });
}

const handleSearchByCompany=(e)=>{
  e.preventDefault();
  axios.get(`/companies/searchbycompany?company=${searchedcompany}`)
    .then((res) => {
        
        setCompanyResults(res.data);
        console.log(res.data);
        navigate('/searchresult', { state: { companyResults: res.data } }); 
        // setSearchSubmit(true);
           
    })
    .catch(error => {
        console.log(error); // Log any error that occurs during the API request
    });
}




  return (
    <>
    <Navbar/>
    <div id="hero-content" className="flex flex-col md:flex-row justify-between items-start max-w-7xl mx-auto px-4 py-12">
  <div id="left-side" className="w-full md:w-1/2 mb-8 md:mb-0">
    <div className="text-center mt-16 md:mt-24 px-4">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-2 text-white font-['Roboto_Condensed']">STOCK</h1>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 text-white font-['Roboto_Condensed']">MARKET</h1>
      <h2 className="text-2xl md:text-3xl lg:text-4xl mb-3 text-white font-['Roboto_Condensed'] ">ANALYSIS DATA AND GRAPHICS</h2>
      <p className="text-lg md:text-xl lg:text-2xl text-white font-['Roboto_Condensed']">Learn, Predict and More..</p>
    </div>

    <form  className="mt-8 flex justify-center" onSubmit={handleSearchByCompany}>
      <div className="relative">
        <input
          name="company"
          type="search"
          autoComplete='off'
          value={searchedcompany}
          onChange={(e) => setSearchByCompany(e.target.value)}
          placeholder="search company"
          className="px-4 py-2 w-64 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="absolute right-0 top-0 mt-2 mr-2">
          <svg
            className="h-6 w-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>

  {/* {searchsubmit&&  <SearchResult companyResults={companyResults} />} */}
    <form  className="mt-4 flex justify-center" onSubmit={handleSearchByCountry}>
      <div className="relative">
        <input
          name="country"
          type="search"
          placeholder="search country"
          autoComplete='off'
          value={searchedcountry}
          onChange={(e) => setSearchByCountry(e.target.value)}
          className="px-4 py-2 w-64 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="absolute right-0 top-0 mt-2 mr-2">
          <svg
            className="h-6 w-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
    
    
   {/* { searchsubmit&&<SearchResult companyResults={companyResults} />} */}
    

    
    <div className="text-center mt-4">
  <button className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm hover:bg-orange-600 hover:scale-110 transition duration-300">
    See More
  </button>
</div>
  </div>

  <div className="w-full md:w-1/2 flex justify-center md:justify-center md:pt-8">
  <div className="relative">
    <div className="absolute inset-0 blur-lg"></div>
    <video
      src={stockvideo}
      autoPlay
      loop
      muted
      playsInline
      className="relative z-10 w-full max-w-[300px] sm:max-w-[350px] md:max-w-[250px] lg:max-w-[300px] xl:max-w-[350px] h-auto rounded-3xl overflow-hidden"
    />
  </div>
</div>
</div>

    
    </>
    
    
  );
}
export default Homepage;

