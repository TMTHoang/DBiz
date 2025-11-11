const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const MatchedProject = require('../models/MatchedProject');

dotenv.config();

const clearMatches = async () => {
  try {
    await connectDB();
    await MatchedProject.deleteMany({});
    console.log('All matched projects cleared!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

clearMatches();
