const { MongoClient } = require('mongodb');

// Connection URI
const uri = "mongodb://localhost:27017"; // Replace with your connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let database;

// Function to connect to the database
const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        database = client.db('poseidon'); 
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

// Function to get the database instance
const getDatabase = () => {
    if (!database) {
        throw new Error("Database is not initialized. Call connectToDatabase first.");
    }
    return database;
};

// Export the functions
module.exports = { connectToDatabase, getDatabase };
