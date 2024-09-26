import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './components/homepage.jsx'
import SearchResult from './components/search_result.jsx'
import CompanyQ from './components/company_q.jsx'

function App() {
  const [companiesFromBackend, setCompanies] = useState([])

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/searchresult" element={<SearchResult companies={companiesFromBackend}/>} />
      <Route path="/companyq" element={<CompanyQ />} />
    </Routes>

    
    </BrowserRouter>
  )
}

export default App
