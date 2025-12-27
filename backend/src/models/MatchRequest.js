const mongoose = require('mongoose');

const MatchRequestSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined', 'matched'],
    default: 'pending'
  },
  requested_date: {
    type: Date,
    default: Date.now
  },
  response_date: {
    type: Date
  },
  score_snapshot: {
    type: Number
  },
  initial_message: {
    type: String
  }
});

module.exports = mongoose.model('MatchRequest', MatchRequestSchema);
