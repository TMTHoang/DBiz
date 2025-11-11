const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
  request_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MatchRequest',
    required: true
  },
  sender_role: {
    type: String,
    enum: ['SME', 'Agency'],
    required: true
  },
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  is_read: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
