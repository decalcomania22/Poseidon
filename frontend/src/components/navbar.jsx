import React from 'react'

function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-transparent">
    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      {/* Left side: Navbar */}
      <div className="text-xl font-bold text-white">
        
        Navbar
      </div>

      {/* Right side: Logout */}
      <div>
        <button className="text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </div>
  </nav>
  )
}

export default Navbar