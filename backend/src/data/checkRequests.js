const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const MatchRequest = require('../models/MatchRequest');
const Agency = require('../models/Agency');

dotenv.config();

const checkRequests = async () => {
  try {
    await connectDB();
    
    // Get all agencies
    const agencies = await Agency.find().limit(5);
    console.log('\n=== First 5 Agencies ===');
    
    for (const agency of agencies) {
      console.log(`\nAgency: ${agency.company_name} (ID: ${agency._id})`);
      
      // Find all requests for this agency
      const requests = await MatchRequest.find({ agency_id: agency._id });
      if (requests.length > 0) {
        console.log(`  Has ${requests.length} request(s):`);
        requests.forEach(req => {
          console.log(`    - ID: ${req._id}, Status: ${req.status}`);
        });
      } else {
        console.log('  No requests found');
      }
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkRequests();
