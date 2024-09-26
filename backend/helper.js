const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/companydb'; 
const dbName = 'companydb';
const collectionName = 'market';

async function getCompanyData(companyName) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        // Query for company data based on company name
        const companyData = await collection.find({ companyName }).toArray();
        
        if (companyData.length === 0) {
            console.log(`No data found for ${companyName}`);
            return [];
        }

        // Process and calculate the year-over-year changes
        return calculateYearlyChanges(companyData);
    } catch (err) {
        console.error('Error retrieving data from MongoDB:', err);
        throw err;
    } finally {
        await client.close();
    }
}

// Calculate year-over-year changes for stock, revenue, expenses, and market share
function calculateYearlyChanges(data) {
    return data.map((company) => {
        const result = [];
        for (let i = 1; i < company.stockPrice.length; i++) {
            result.push({
                year: company.years[i], 
                stockPriceChange: calculateChange(company.stockPrice[i - 1], company.stockPrice[i]),
                expenseChange: calculateChange(company.expense[i - 1], company.expense[i]),
                revenueChange: calculateChange(company.revenue[i - 1], company.revenue[i]),
                marketShareChange: calculateChange(company.marketShare[i - 1], company.marketShare[i])
            });
        }

        return {
            companyName: company.companyName,
            country: company.country,
            yearOverYearChanges: result
        };
    });
}

// Helper function to calculate percentage change
function calculateChange(prevValue, currentValue) {
    if (prevValue === 0) return 0; // Avoid division by zero
    return ((currentValue - prevValue) / prevValue * 100).toFixed(2);
}

// Function to generate a table to display the year-over-year changes
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

// Main function to fetch data and display the table for a given company
async function displayCompanyFinancials(companyName) {
    try {
        const companyData = await getCompanyData(companyName);
        const htmlTable = generateTable(companyData);
        console.log(htmlTable); // This prints the table to the console (you can adapt to a web page if needed)
    } catch (error) {
        console.error('Error:', error);
    }
}

const companyName = 
displayCompanyFinancials(companyName);

