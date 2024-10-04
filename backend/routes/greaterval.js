const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Company = require('../model/company'); 

// Route to get counts of companies with higher values
router.post('/values', async (req, res) => {
  const { companyName } = req.body; // Extract the company name from the request body
  try {
    // Find the current company's details by name
    const currentCompany = await Company.findOne({ company: companyName });

    if (!currentCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Extract the 2024 values for comparison
    const { stockPrices, marketShares, expenses,revenues } = currentCompany;
    
    // Perform the queries to find counts of companies with higher values
    const counts = await Promise.all([
      Company.countDocuments({ 'stockPrices.2024': { $gt: stockPrices[2024] } }),  
      Company.countDocuments({ 'marketShares.2024': { $gt: marketShares[2024] } }), 
      Company.countDocuments({ 'expenses.2024': { $gt: expenses[2024] } }), 
      Company.countDocuments({ 'revenues.2024': { $gt: revenues[2024] } })
    ]);

    // Return the counts as an array
    res.json(counts); // counts = [higherStockPriceCount, higherMarketShareCount, higherExpenseCount]
  } catch (error) {
    console.error('Error fetching higher values:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
