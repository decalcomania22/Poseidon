const express = require("express");
const country = require("../models/company.js");

const router = express.Router();
// Search companies by country
router.get("/search", async (req, res) => {
  const { country } = req.query; // Get the country from query parameters

  try {
    const companies = await User.find({ country }); // Assuming User model has a 'country' field
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
