const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const companySearch = require("./routes/companyInD.js");
const countrySearch = require("./routes/searchResult.js");
const { spawn } = require('child_process'); // Import child_process

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/compdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use("/countries", countrySearch);
app.use("/companies", companySearch);

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
