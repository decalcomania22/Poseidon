import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/homepage.jsx';
import SearchResult from './components/search_result.jsx';
import CompanyQ from './components/company_q.jsx';

function App() {
  const [companies, setCompanies] = useState([]); // State to hold companies

  // Fetch companies when the search query is provided
  const fetchCompanies = async (searchText) => {
    try {
      const response = await fetch(`/searchresult?searchtext=${searchText}`);
      const data = await response.json();
      setCompanies(data); // Set companies in state
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  // Optionally, fetch companies when the component loads with an empty search initially
  useEffect(() => {
    fetchCompanies(''); // Fetch with an empty search term when the component loads
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage onSearch={fetchCompanies} />} />
        <Route path="/searchresult" element={<SearchResult companies={companies} />} />
        <Route path="/companyq" element={<CompanyQ />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
