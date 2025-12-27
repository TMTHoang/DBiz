const mongoose = require('mongoose');

const MatchScoreSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  agency_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agency',
    required: true
  },
  service_overlap_score: {
    type: Number,
    default: 0
  },
  budget_score: {
    type: Number,
    default: 0
  },
  rating_score: {
    type: Number,
    default: 0
  },
  premium_boost: {
    type: Number,
    default: 0
  },
  total_score: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MatchScore', MatchScoreSchema);
