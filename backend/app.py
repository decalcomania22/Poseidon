# app.py
from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
from poseidonPred import makePredictionsStockPrice, makePredictionsExpenses  # Adjust the import based on your file structure

app = Flask(__name__)
CORS(app)
# Load your historical data once at the start, assuming df is defined in poseidon.py
# If df is not accessible directly, you'll need to load it in this file
df = pd.read_csv("C:\\Users\\USER\\Documents\\my_codes\\Poseidon\\backend\\model\\Mock_Data_Prepathon.csv", encoding='utf-8') # Uncomment and adjust if needed

@app.route('/predict/stock', methods=['POST'])
def predict_stock_price():
    data = request.json
    company_name = data.get('company')
    
    if not company_name:
        return jsonify({'error': 'Company Name is required'}), 400

    # Filter the DataFrame for the specified company
    company_data = df[df['company'] == company_name]  # Adjust the column name if necessary

    if company_data.empty:
        return jsonify({'error': 'No data found for the specified company'}), 404

    try:
        predictions = makePredictionsStockPrice(company_data)
        return jsonify(predictions.tolist())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/predict/expenses', methods=['POST'])
def predict_expenses():
    data = request.json
    company_name = data.get('companyName')
    
    if not company_name:
        return jsonify({'error': 'Company Name is required'}), 400

    # Filter the DataFrame for the specified company
    company_data = df[df['company'] == company_name]  # Adjust the column name if necessary

    if company_data.empty:
        return jsonify({'error': 'No data found for the specified company'}), 404

    try:
        predictions = makePredictionsExpenses(company_data)
        return jsonify(predictions.tolist())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)  # Run on port 5000