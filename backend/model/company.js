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
    "2015": { type: String },
    "2016": { type: String },
    "2017": { type: String },
    "2018": { type: String },
    "2019": { type: String },
    "2020": { type: String },
    "2021": { type: String },
    "2022": { type: String },
    "2023": { type: String },
    "2024": { type: String }
  },
  expenses: {
    "2015": { type: String },
    "2016": { type: String },
    "2017": { type: String },
    "2018": { type: String },
    "2019": { type: String },
    "2020": { type: String },
    "2021": { type: String },
    "2022": { type: String },
    "2023": { type: String },
    "2024": { type: String }
  },
  revenues: {
    "2015": { type: String },
    "2016": { type: String },
    "2017": { type: String },
    "2018": { type: String },
    "2019": { type: String },
    "2020": { type: String },
    "2021": { type: String },
    "2022": { type: String },
    "2023": { type: String },
    "2024": { type: String }
  },
  marketShares: {
    "2015": { type: Number },
    "2016": { type: Number },
    "2017": { type: Number },
    "2018": { type: Number },
    "2019": { type: Number },
    "2020": { type: Number },
    "2021": { type: Number },
    "2022": { type: Number },
    "2023": { type: Number },
    "2024": { type: Number }
  }
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
