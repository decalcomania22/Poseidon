const express = require('express');
const mongoose = require('mongoose');
const Company = require('../model/company'); 

const router = express.Router();

router.get('/searchbycountry', async (req, res) => {
  const countryName = req.query.country;

  try {
    const countryData = await getCountryData(countryName);

    if (!countryData || countryData.length === 0) {
      res.status(404).json({ message: `No companies found in ${countryName}` });
      return;
    }

    res.json(countryData);
  } catch (error) {
    console.error('Error retrieving company data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Function to retrieve companies by country name
async function getCountryData(countryName) {
  // Use the Company model to find the company data
  const countryData = await Company.find({ country: { $regex: countryName, $options: 'i' } });
  return countryData;
}

module.exports = router;
