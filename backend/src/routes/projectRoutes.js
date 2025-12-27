const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
  // For demo purposes, show all projects regardless of status
  const projects = await Project.find({}).sort({ created_at: -1 });
  res.json(projects);
}));

// @route   GET /api/projects/:id
// @desc    Get a single project by ID
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  res.json(project);
}));

// @desc    Create new project
// @route   POST /api/projects
// @access  Public
router.post('/', asyncHandler(async (req, res) => {
  const {
    title,
    description,
    needed_services,
    budget_min,
    budget_max,
    industry,
    location_city,
    location_country,
    status
  } = req.body;

  // Validation
  if (!title || !needed_services || needed_services.length === 0) {
    res.status(400);
    throw new Error('Title and needed services are required');
  }

  // Create project
  const project = await Project.create({
    title,
    description,
    needed_services,
    budget_min,
    budget_max,
    industry,
    location_city,
    location_country,
    status: status || 'open'
  });

  res.status(201).json(project);
}));

module.exports = router;
