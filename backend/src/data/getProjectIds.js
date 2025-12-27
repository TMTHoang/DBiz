const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Project = require('../models/Project');

dotenv.config();

const getProjectIds = async () => {
  try {
    await connectDB();
    const projects = await Project.find();
    console.log('\n=== Projects in Database ===');
    projects.forEach(p => {
      console.log(`ID: ${p._id}`);
      console.log(`Title: ${p.title}`);
      console.log('---');
    });
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

getProjectIds();
