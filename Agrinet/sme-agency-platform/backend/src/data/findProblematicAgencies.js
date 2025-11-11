const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const MatchRequest = require('../models/MatchRequest');
const Agency = require('../models/Agency');

dotenv.config();

const findProblematicAgencies = async () => {
  try {
    await connectDB();
    
    // Get all agencies
    const agencies = await Agency.find();
    console.log(`\n=== Checking ${agencies.length} Agencies ===\n`);
    
    const problematicAgencies = [];
    
    for (const agency of agencies) {
      const requests = await MatchRequest.find({ agency_id: agency._id });
      if (requests.length > 0) {
        problematicAgencies.push({
          name: agency.company_name,
          id: agency._id,
          requests: requests.map(r => ({ id: r._id, status: r.status }))
        });
      }
    }
    
    if (problematicAgencies.length > 0) {
      console.log('Found agencies with existing requests:');
      problematicAgencies.forEach(agency => {
        console.log(`\n${agency.name} (${agency.id}):`);
        agency.requests.forEach(req => {
          console.log(`  - Request ${req.id}: ${req.status}`);
        });
      });
    } else {
      console.log('No agencies have existing requests.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

findProblematicAgencies();
