const express = require("express");
const Company = require("../model/company.js");

const router = express.Router();
// Search companies by country
router.get("/search", async (req, res) => {
  const { country } = req.query;

  try {
    const companies = await Company.find({ country });
    res.json(companies);

    if (companies.length === 0) {
        return res.status(404).json({ message: 'No companies found in this country.' });
      }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
