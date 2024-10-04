import React from 'react'
import Navbar from '../components/navbar.jsx'
import { useLocation } from 'react-router-dom'; 

function Greaterval(){
    const location = useLocation();
   
  
    const { ansarray } = location.state;

    return (
        <>
        <Navbar/>
         <div className="mt-20 flex flex-col items-center">
        
          <div className='bg-gradient-to-t from-gray-800 to-gray-900 text-white rounded-lg p-4 w-4/5 mb-4 hover:scale-105 transition-transform duration-300'>
            Number of companies with greater stock price: {ansarray[0]}  
          </div>
          <div className='bg-gradient-to-t from-gray-800 to-gray-900 text-white rounded-lg p-4 w-4/5 mb-4 hover:scale-105 transition-transform duration-300'>
            Number of companies with greater market share: {ansarray[1]}  
          </div>
          <div className='bg-gradient-to-t from-gray-800 to-gray-900 text-white rounded-lg p-4 w-4/5 mb-4 hover:scale-105 transition-transform duration-300'>
           Number of companies with greater revenue: {ansarray[2]}  
          </div>
          <div className='bg-gradient-to-t from-gray-800 to-gray-900 text-white rounded-lg p-4 w-4/5 mb-4 hover:scale-105 transition-transform duration-300'>
            Number of companies with greater expense: {ansarray[3]}  
          </div>

         
      </div>
   
        </>


    )
}

export default Greaterval;