// backend/server.js

const express = require('express');
const { connectToDatabase, getDatabase } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to the database
const startServer = async () => {
    await connectToDatabase(); // Connect to the database

    // Sample route to get data from the database
    app.get('/searchresult', async (req, res) => {
      try {
          const db = getDatabase();
          const collection = db.collection('poseidon');
  
          // Get the search term (serachtext) from query parameters
          const { searchtext } = req.query;  // Make sure the name matches your form
  
          // Use a regex to find companies that partially match the search text
          const query = searchtext ? { company: { $regex: searchtext, $options: 'i' } } : {};
  
          // Search for matching companies
          const data = await collection.find(query).toArray();
  
          res.json(data);  // Return the results as JSON
      } catch (error) {
          console.error("Error fetching data:", error);
          res.status(500).json({ message: 'Internal Server Error' });
      }
  });
  

   

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

// Start the server
startServer().catch(console.error);
