const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const collectionName = 'poseidon';

router.get('/search', async (req, res) => {
  const countryName = req.query.country;

  try {
    const countryData = await getCountryData(countryName);

    if (!countryData || countryData.length === 0) {
      res.status(404).json({ message: `No companies found in ${countryName}` });
      return;
    }

    res.json(countryData);
  } catch (error) {
    console.error('Error retrieving country data:', error);
    res.status(500).json({ message: 'Internal server error' }); issues
  }
});

// Function to retrieve companies by country name
async function getCountryData(countryName) {
  const collection = mongoose.connection.collection(collectionName);
  const countryData = await collection.find({ country:  { $regex: countryName, $options: 'i' } }); 
  return countryData.toArray(); 
}

module.exports = router;
