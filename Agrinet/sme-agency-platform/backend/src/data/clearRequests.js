const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const MatchRequest = require('../models/MatchRequest');

dotenv.config();

const clearRequests = async () => {
  try {
    await connectDB();
    await MatchRequest.deleteMany({});
    console.log('All match requests cleared!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

clearRequests();
