const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017'; 
const dbName = 'companydb';
const collectionName = 'poseidon'; 

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve the HTML file with the search form
app.get('/', (req, res) => {
    res.render('index', { results: '' });
});

// Handle the search request and display results
app.get('/search', async (req, res) => {
    const companyName = req.query.companyName;

    try {
        const companyData = await getCompanyData(companyName);

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

// Endpoint to get unique company names by country
app.get('/companies', async (req, res) => {
    const countryName = req.query.country;

    try {
        const uniqueCompanies = await getUniqueCompaniesByCountry(countryName);

        if (uniqueCompanies.length === 0) {
            res.send(`<p>No unique companies found for ${countryName}</p>`);
            return;
        }

        res.send(`<p>Unique companies in ${countryName}: ${uniqueCompanies.join(', ')}</p>`);
    } catch (error) {
        console.error('Error:', error);
        res.send(`<p>Error retrieving unique companies</p>`);
    }
});

// Function to connect to MongoDB and retrieve company data
async function getCompanyData(companyName) {
    const client = new mongoose(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const companyData = await collection.find({ company: companyName }).toArray();
        return calculateYearlyChanges(companyData.map(convertStringToNumbers));
    } catch (err) {
        console.error('Error retrieving data from MongoDB:', err);
        throw err;
    } finally {
        await client.close();
    }
}

// Function to retrieve unique company names from the specified country
async function getUniqueCompaniesByCountry(countryName) {
    const client = new mongoose(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const uniqueCompanies = await collection.distinct('company', { country: countryName });
        return uniqueCompanies;
    } catch (err) {
        console.error('Error retrieving data from MongoDB:', err);
        throw err;
    } finally {
        await client.close();
    }
}

// Function to convert string values to numbers
function convertStringToNumbers(company) {
    const convertFieldsToNumber = (fields) => {
        for (const year in fields) {
            fields[year] = parseFloat(fields[year]);
        }
        return fields;
    };

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
        for (let i = 1; i < Object.keys(company.stockPrices).length; i++) {
            const years = Object.keys(company.stockPrices);
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
    if (prevValue === 0) return 0;
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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = getCompanyData;