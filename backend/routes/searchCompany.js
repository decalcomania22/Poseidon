const express = require('express');
const mongoose = require('mongoose');
const Company = require('../model/company'); 

const router = express.Router();

router.get('/searchbycompany', async (req, res) => {
  const companyName = req.query.company;

  try {
    const companyData = await getCompanyData(companyName);

    if (!companyData || companyData.length === 0) {
      res.status(404).json({ message: `No companies found for "${companyName}"` });
      return;
    }

    res.json(companyData);
  } catch (error) {
    console.error('Error retrieving company data:', error);
    res.status(500).json({ message: 'Internal server error' }); 
  }
});

// Function to retrieve companies by company name
async function getCompanyData(companyName) {
  // Use the Company model to find the company data
  const companyData = await Company.find({ company: { $regex: companyName, $options: 'i' } }); 
  return companyData; 
}

module.exports = router;
