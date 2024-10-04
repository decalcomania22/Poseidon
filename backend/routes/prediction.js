const express = require('express');
const router = express.Router();
const axios = require('axios'); // Make sure to install axios

router.post('/predict', async (req, res) => {
    const companyName = req.body.company; // Extract companyName from request body

    if (!companyName) {
        return res.status(400).json({ error: 'Company Name is required' });
    }

    try {
        const stockResponse = await axios.post('http://localhost:5000/predict/stock', { companyName });
        const stockPredictions = stockResponse.data;

        // Call the Flask API for expense prediction
        const expenseResponse = await axios.post('http://localhost:5000/predict/expenses', { companyName });
        const expensePredictions = expenseResponse.data;

        // Return both predictions
        res.json({ stockPredictions, expensePredictions });
    } catch (error) {
        console.error('Error making predictions:', error);
        res.status(500).json({ error: 'Failed to make predictions' });
    }
});

module.exports = router;
