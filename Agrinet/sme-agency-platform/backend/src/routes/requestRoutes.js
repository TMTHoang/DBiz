const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const MatchRequest = require('../models/MatchRequest');

// @route   POST /api/requests
// @desc    Create a new connection request
// @access  Public
router.post('/', asyncHandler(async (req, res) => {
  const { projectId, agencyId, initialMessage, scoreSnapshot } = req.body;

  // Check if an ACTIVE request already exists for this project-agency pair
  // (exclude 'matched' status to allow re-connecting after confirmation)
  const existingRequest = await MatchRequest.findOne({
    project_id: projectId,
    agency_id: agencyId,
    status: { $in: ['pending', 'accepted', 'declined'] } // Only check non-matched requests
  });

  if (existingRequest) {
    res.status(400);
    throw new Error('A connection request already exists for this project and agency');
  }

  // Create new match request
  const newRequest = new MatchRequest({
    project_id: projectId,
    agency_id: agencyId,
    initial_message: initialMessage,
    score_snapshot: scoreSnapshot,
    status: 'pending'
  });

  // Save to database
  await newRequest.save();

  res.status(201).json(newRequest);
}));

// @route   GET /api/requests
// @desc    Get all match requests (optionally filtered by projectId or agencyId)
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
  // Build filter query based on query parameters
  const filter = {};
  
  if (req.query.projectId) {
    filter.project_id = req.query.projectId;
  }
  
  if (req.query.agencyId) {
    filter.agency_id = req.query.agencyId;
  }

  // Find all match requests matching the filter and populate related data
  const requests = await MatchRequest.find(filter)
    .populate('project_id')
    .populate('agency_id');

  res.json(requests);
}));

// @route   DELETE /api/requests/:requestId
// @desc    Delete a match request (for resetting sessions)
// @access  Public
router.delete('/:requestId', asyncHandler(async (req, res) => {
  const request = await MatchRequest.findById(req.params.requestId);

  if (!request) {
    res.status(404);
    throw new Error('Match request not found');
  }

  await MatchRequest.findByIdAndDelete(req.params.requestId);

  res.json({ message: 'Match request deleted successfully' });
}));

module.exports = router;
