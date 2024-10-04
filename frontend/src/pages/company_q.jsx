import React, { useState } from 'react';
import Navbar from '../components/navbar.jsx'
const navigate = useNavigate();
import { useLocation } from 'react-router-dom';

import axios from 'axios';

function CompanyQ() {
  const [selectedOption, setSelectedOption] = useState('')
  const location = useLocation(); // Get location object
  const { company } = location.state; // Extract company from location state

  

const handleSubmit = async (e) => {
  e.preventDefault();
  if (selectedOption === '2') {
    try {
      
      const response = await axios.post('/getHigherValues/values', {
        company: company, // Pass company to backend
      });

  
      const data = response.data;

      // Navigate to /greater_val and pass the data to the next page
      navigate('/greater_val', { state: { values: data } });

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
};



  return (
    <>
    <Navbar/>
    <div>
      <p>You might want to know about: {company.company}</p> {/* Display company name */}
    </div>
    
<form className="mt-8 flex justify-center"  onSubmit={handleSubmit}>
  <div className="relative">
    <select
      name="dropdown"
      className="px-10 py-2 w-200
       text-lg  text-gray-600  rounded-full border border-transparent focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
       value={selectedOption}
       onChange={(e)=>setSelectedOption(e.target.value)}
    >
     <option value="" disabled selected>
  Learn About the Company
</option>
<option value="1">Year-wise changes in stock price</option>
<option value="2">Companies with higher stock price, market share, revenue, or expenses</option>
<option value="3">Company's stability analysis</option>
<option value="4">Predict next year's stock price, market share, revenue, and expenses</option>

    </select>
    <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
     
    </button>
  </div>
</form>



    </>
  )
}

export default CompanyQ;

