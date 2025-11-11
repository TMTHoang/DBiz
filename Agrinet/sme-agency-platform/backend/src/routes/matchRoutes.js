const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const MatchRequest = require('../models/MatchRequest');
const MatchedProject = require('../models/MatchedProject');
const Project = require('../models/Project');

// @route   POST /api/match/confirm/:requestId
// @desc    Confirm a match and create a matched project
// @access  Public
router.post('/confirm/:requestId', asyncHandler(async (req, res) => {
  // 1. Find the match request
  const matchRequest = await MatchRequest.findById(req.params.requestId);

  if (!matchRequest) {
    res.status(404);
    throw new Error('Match request not found');
  }

  // 2. Update the match request status to 'matched'
  matchRequest.status = 'matched';
  matchRequest.response_date = Date.now();
  await matchRequest.save();

  // 3. Find and update the project status to 'matched'
  const project = await Project.findById(matchRequest.project_id);
  if (project) {
    project.status = 'matched';
    await project.save();
  }

  // 4. Create a new matched project document
  const matchedProject = new MatchedProject({
    request_id: matchRequest._id,
    project_id: matchRequest.project_id,
    agency_id: matchRequest.agency_id,
    status: 'active'
  });

  await matchedProject.save();

  // 5. Send the matched project as response
  res.status(201).json(matchedProject);
}));

module.exports = router;
