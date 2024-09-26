import React from 'react'
import Navbar from './navbar.jsx'
function SearchResult({ companies }) {
    return (
      <>
        <Navbar />
        <div className="w-80 bg-white border border-gray-300 rounded-lg shadow-md p-4">
          {companies.map((company, index) => (
            <div key={index} className="hover:bg-gray-200 p-2 cursor-pointer">
              {company}
            </div>
          ))}
        </div>
      </>
    )
  }
export default SearchResult

