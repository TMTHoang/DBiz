const mongoose = require('mongoose');

const AgencySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  company_name: {
    type: String,
    required: true
  },
  location_city: {
    type: String
  },
  location_country: {
    type: String
  },
  offered_services: {
    type: [String],
    required: true
  },
  budget_min: {
    type: Number
  },
  budget_max: {
    type: Number
  },
  agency_rating: {
    type: Number,
    default: 0
  },
  subscription_type: {
    type: String,
    enum: ['basic', 'premium'],
    default: 'basic'
  },
  experience_years: {
    type: Number
  },
  team_size: {
    type: Number
  },
  awards: {
    type: [String]
  },
  portfolio: {
    type: [Object]
  }
});

module.exports = mongoose.model('Agency', AgencySchema);
