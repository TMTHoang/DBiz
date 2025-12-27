const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const ChatMessage = require('../models/ChatMessage');

// @route   POST /api/chat
// @desc    Send a new chat message
// @access  Public
router.post('/', asyncHandler(async (req, res) => {
  const { requestId, senderRole, senderId, content } = req.body;

  // Create new chat message
  const newMessage = new ChatMessage({
    request_id: requestId,
    sender_role: senderRole,
    sender_id: senderId,
    content: content
  });

  // Save to database
  await newMessage.save();

  res.status(201).json(newMessage);
}));

// @route   GET /api/chat/:requestId
// @desc    Get all chat messages for a specific match request
// @access  Public
router.get('/:requestId', asyncHandler(async (req, res) => {
  // Find all messages for this request and sort by timestamp (oldest first)
  const messages = await ChatMessage.find({
    request_id: req.params.requestId
  }).sort({ timestamp: 1 });

  res.json(messages);
}));

module.exports = router;
