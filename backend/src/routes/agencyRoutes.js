const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Agency = require('../models/Agency');

// @route   GET /api/agencies/:id
// @desc    Get agency profile by ID
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
  const agency = await Agency.findById(req.params.id);

  if (!agency) {
    res.status(404);
    throw new Error('Agency not found');
  }

  res.json(agency);
}));

module.exports = router;
