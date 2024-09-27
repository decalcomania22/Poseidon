const express = require("express");
const Company = require("../model/company.js");

const router = express.Router();

router.get('/searchresult', async (req, res) => {
  try {
      const db = getDatabase();
      const collection = db.collection('poseidon');
  
          // Get the search term (searchtext) from query parameters
          const { searchtext } = req.query;  
  
          // Use a regex to find companies that partially match the search text
          const query = searchtext ? { company: { $regex: searchtext, $options: 'i' } } : {};
  
          // Search for matching companies
          const data = await collection.find(query).toArray();
  
          res.json(data);  // Return the results as JSON
          if (companies.length === 0) {
            return res.status(404).json({ message: 'No companies found in this country.' });
          }
      } catch (error) {
          console.error("Error fetching data:", error);
          res.status(500).json({ message: 'Internal Server Error' });
      }
  });

  module.exports = router;