const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
const path= require("path")
// const companySearch = require("./routes/companyInD.js");
const sbcompany = require("./routes/searchCompany.js"); 
const sbcountry=require("./routes/searchCountry.js");
const greaterval=require("./routes/greaterval.js");
// const dotenv = require("dotenv");
// const path = require("path");
const companySearch = require("./routes/companyInD.js");

const { spawn } = require('child_process'); // Import child_process


// dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, '../frontend')));

// // Middleware to serve .jsx files as JavaScript
// app.use((req, res, next) => {
//   if (req.url.endsWith('.jsx')) {
//     res.setHeader('Content-Type', 'application/javascript');
//   }
//   next();
// });

app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Handle all other routes by sending the index.html from the build folder
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
});


//const URI="mongodb+srv://Suhani:Password1234@freecluster.7js40.mongodb.net/poseidon?retryWrites=true&w=majority&appName=freecluster";

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://Suhani:Password1234@freecluster.7js40.mongodb.net/poseidon?retryWrites=true&w=majority&appName=freecluster"
  )
  .then(() => {console.log("MongoDB connected");
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch((err)=> console.log("could not connect to db",err));

  // app.set('view engine', 'ejs');
  // app.set('views', path.join(__dirname, 'views'));

// Routes
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
// app.use("/countries", countrySearch);
// app.use("/companies", companySearch);

// Function to start the Flask app
function startFlaskApp() {
  const flaskApp = spawn('python', ['../backend/app.py']); // Adjust the path to your Flask app

  flaskApp.stdout.on('data', (data) => {
    console.log(`Flask: ${data}`);
  });

  
  flaskApp.stderr.on('data', (data) => {
    console.error(`Flask Error: ${data}`);
  });

  flaskApp.on('close', (code) => {
    console.log(`Flask app exited with code ${code}`);
  });
}

// Start the Flask app
startFlaskApp();

app.use("/countries",sbcountry);
app.use("/companies",sbcompany);

app.use("/getHigherValues",greaterval);










