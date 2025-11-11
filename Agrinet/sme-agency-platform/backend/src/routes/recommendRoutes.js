const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');
const Agency = require('../models/Agency');
const MatchScore = require('../models/MatchScore');
const { calculateTotalScore } = require('../services/recommendationService');

// @desc    Get agency recommendations for a project
// @route   GET /api/recommend/:projectId
// @access  Public
router.get('/:projectId', asyncHandler(async (req, res) => {
  // 1. Find the project by ID
  const project = await Project.findById(req.params.projectId);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // 2. Fetch all agencies
  const agencies = await Agency.find({});

  // 3. Create empty recommendations array
  const recommendations = [];

  // 4. Loop through each agency
  for (const agency of agencies) {
    // 5. Calculate scores for this agency
    const scores = calculateTotalScore(project, agency);

    // 6. Optional: Save MatchScore for logging/analytics
    const matchScore = new MatchScore({
      project_id: project._id,
      agency_id: agency._id,
      service_overlap_score: scores.service_overlap_score,
      budget_score: scores.budget_score,
      rating_score: scores.rating_score,
      premium_boost: scores.premium_boost,
      total_score: scores.total_score
    });

    await matchScore.save();

    // 7. Push agency and scores to recommendations array
    recommendations.push({
      agency,
      scores
    });
  }

  // Sort recommendations by total_score in descending order (highest first)
  recommendations.sort((a, b) => b.scores.total_score - a.scores.total_score);

  // Send sorted recommendations as JSON response
  res.json(recommendations);
}));

module.exports = router;
