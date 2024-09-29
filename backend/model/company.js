const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  slNo: {
    type: Number,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String,
    required: true,
  },
  marketCap: {
    type: String,
    required: true,
  },
  diversity: {
    type: Number,
    required: true,
  },
  stockPrices: {
    2015: { type: Number },
    2016: { type: Number },
    2017: { type: Number },
    2018: { type: Number },
    2019: { type: Number },
    2020: { type: Number },
    2021: { type: Number },
    2022: { type: Number },
    2023: { type: Number },
    2024: { type: Number }
  },
  expenses: {
    2015: { type: Number },
    2016: { type: Number },
    2017: { type: Number },
    2018: { type: Number },
    2019: { type: Number },
    2020: { type: Number },
    2021: { type: Number },
    2022: { type: Number },
    2023: { type: Number },
    2024: { type: Number }
  },
  revenues: {
    2015: { type: Number },
    2016: { type: Number },
    2017: { type: Number },
    2018: { type: Number },
    2019: { type: Number },
    2020: { type: Number },
    2021: { type: Number },
    2022: { type: Number },
    2023: { type: Number },
    2024: { type: Number }
  },
  marketShares: {
    2015: { type: Number },
    2016: { type: Number },
    2017: { type: Number },
    2018: { type: Number },
    2019: { type: Number },
    2020: { type: Number },
    2021: { type: Number },
    2022: { type: Number },
    2023: { type: Number },
    2024: { type: Number }
  }
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
