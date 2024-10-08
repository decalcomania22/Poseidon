import React from 'react'
import Navbar from '../components/navbar.jsx'
import { useLocation, useNavigate } from 'react-router-dom'; 

function SearchResult() {
  const location = useLocation();
  const navigate = useNavigate(); 

  const { companyResults } = location.state || { companyResults: [] }; // this state is coming from Homepage
  //console.log(companyResults);
  const handleCompanyClick = (company) => {
    navigate('/company_q', { state: { company } }); 
  };

  return (
    <>
      <Navbar />
      <div className="mt-20 flex flex-col items-center">
      <pre style={{ color: 'white' }}>
          {JSON.stringify(companyResults, null, 2)}
        </pre>
        {companyResults.length > 0 ? (
          companyResults.map((company) => (
            <div key ={company._id} className='bg-gradient-to-t from-gray-800 to-gray-900 text-white rounded-lg p-4 w-4/5 mb-4 hover:scale-105 transition-transform duration-300' onClick={() => handleCompanyClick(company)}>
              {company.company} 
            </div>
          ))
        ) : (
          <p className="text-white">No companies found</p>
        )}
      </div>
    </>
  );
}


export default SearchResult