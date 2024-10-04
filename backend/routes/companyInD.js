const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const collectionName = 'poseidon';

router.get('/', (req, res) => {
    res.render('index', { results: '' });
});

// Handle the search request and display results
router.get('/search', async (req, res) => {
    const companyName = req.query.company;
    console.log('Searching for company:', companyName); // Debugging log

    try {
        const companyData = await getCompanyData(companyName);
        //console.log('Company data retrieved:', companyData); 

        if (companyData.length === 0) {
            res.render('index', { results: `<p>No data found for ${companyName}</p>` });
            return;
        }

        const tableHTML = generateTable(companyData);
        res.render('index', { results: tableHTML });
    } catch (error) {
        console.error('Error:', error);
        res.render('index', { results: `<p>Error retrieving data</p>` });
    }
});

async function getCompanyData(companyName) {
    const collection = mongoose.connection.collection(collectionName);
    const companyData = await collection.find({ company: { $regex: new RegExp(companyName, "i") } }).toArray();
    return calculateYearlyChanges(companyData.map(convertStringToNumbers));
}

function clean(val) {
    if (typeof val === 'number') return val; 

    if (typeof val === 'string') {
    
        val = val.replace(/[^0-9.-MB]+/g, '');

        if (val === '') return null;
        if (val.endsWith('B')) {
            return parseFloat(val.slice(0, -1)) * 1e9; 
        } else if (val.endsWith('M')) {
            return parseFloat(val.slice(0, -1)) * 1e6; 
        }

        return parseFloat(val); 
    }

    return null; 
}
function convertStringToNumbers(company) {
    const convertFieldsToNumber = (fields) => {
        const numericValues = [];
        for (const year in fields) {
            if (fields[year] === "n/a") {
                numericValues.push(null);
                //console.log('Before cleaning:', fields[year]);
                const number = clean(fields[year]);
                //console.log('After cleaning:', number);
                numericValues.push(number);
                fields[year] = number;
            }
        }

        const mean = numericValues.filter(value => value !== null); 
        const sum = mean.reduce((acc, val) => acc + val, 0);
        const meanValue = mean.length > 0 ? sum / mean.length : 0;
        for (const year in fields) {
            if (fields[year] === null) {
                fields[year] = meanValue; 
            }
        }

        return fields;
    };
    company.fields = convertFieldsToNumber(company.fields);

    return {
        ...company,
        stockPrices: convertFieldsToNumber(company.stockPrices),
        expenses: convertFieldsToNumber(company.expenses),
        revenues: convertFieldsToNumber(company.revenues),
        marketShares: convertFieldsToNumber(company.marketShares),
    };
}

// Function to calculate year-over-year changes
function calculateYearlyChanges(data) {
    return data.map((company) => {
        const result = [];
        const years = Object.keys(company.stockPrices);
        for (let i = 1; i < years.length; i++) {
            result.push({
                year: years[i],
                stockPriceChange: calculateChange(company.stockPrices[years[i - 1]], company.stockPrices[years[i]]),
                expenseChange: calculateChange(company.expenses[years[i - 1]], company.expenses[years[i]]),
                revenueChange: calculateChange(company.revenues[years[i - 1]], company.revenues[years[i]]),
                marketShareChange: calculateChange(company.marketShares[years[i - 1]], company.marketShares[years[i]]),
            });
        }
        return {
            companyName: company.company,
            country: company.country,
            yearOverYearChanges: result,
        };
    });
}

// Helper function to calculate percentage change
function calculateChange(prevValue, currentValue) {
    if (prevValue === null || prevValue === 0 || currentValue === null) return 0;
    return ((currentValue - prevValue) / prevValue * 100).toFixed(2);
}

// Function to generate an HTML table to display results
function generateTable(data) {
    if (!data || data.length === 0) {
        return '<p>No data available</p>';
    }

    let table = `
        <table border="1">
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Country</th>
                    <th>Year</th>
                    <th>Stock Price Change (%)</th>
                    <th>Expense Change (%)</th>
                    <th>Revenue Change (%)</th>
                    <th>Market Share Change (%)</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach((company) => {
        company.yearOverYearChanges.forEach((change) => {
            table += `
                <tr>
                    <td>${company.companyName}</td>
                    <td>${company.country}</td>
                    <td>${change.year}</td>
                    <td>${change.stockPriceChange}</td>
                    <td>${change.expenseChange}</td>
                    <td>${change.revenueChange}</td>
                    <td>${change.marketShareChange}</td>
                </tr>
            `;
        });
    });

    table += '</tbody></table>';
    return table;
}
module.exports = router;
