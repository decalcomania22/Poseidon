// // backend/server.js

const express = require('express');
const { connectToDatabase, getDatabase } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to the database
const startServer = async () => {
    await connectToDatabase(); // Connect to the database

//  
  

   

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

// // Start the server
startServer().catch(console.error);
