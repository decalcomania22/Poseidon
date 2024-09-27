const express = require("express");
const mongoose = require('mongodb');
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const compSearch = require("./routes/compSearh.js");

dotenv.config();

const app = express();
const port = 5000;

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

// Routes
//app.use("/api/blogs", compSerahc);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});