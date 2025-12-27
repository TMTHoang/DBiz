const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  sme_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SME'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  needed_services: {
    type: [String],
    required: true
  },
  budget_min: {
    type: Number
  },
  budget_max: {
    type: Number
  },
  industry: {
    type: String
  },
  location_city: {
    type: String
  },
  location_country: {
    type: String
  },
  status: {
    type: String,
    enum: ['open', 'matched', 'closed'],
    default: 'open'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
