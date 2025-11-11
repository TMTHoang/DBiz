const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Project = require('../models/Project');
const Agency = require('../models/Agency');

dotenv.config();
connectDB();

// Sample data arrays
const sampleServices = [
  'SEO',
  'Social Media',
  'Content Marketing',
  'PPC',
  'Web Design',
  'E-commerce Dev',
  'Brand Strategy',
  'Email Marketing'
];

const sampleLocations = [
  { city: 'New York', country: 'USA' },
  { city: 'London', country: 'UK' },
  { city: 'Tokyo', country: 'Japan' }
];

// 5 Sample Projects
const sampleProjects = [
  {
    title: 'New E-commerce Site',
    description: 'Building a modern e-commerce platform for tech gadgets',
    needed_services: ['Web Design', 'E-commerce Dev', 'SEO'],
    budget_min: 5000,
    budget_max: 15000,
    industry: 'Technology',
    location_city: 'New York',
    location_country: 'USA'
  },
  {
    title: 'Local Restaurant Social Media',
    description: 'Social media campaign for new restaurant opening',
    needed_services: ['Social Media', 'Content Marketing'],
    budget_min: 1000,
    budget_max: 3000,
    industry: 'Food & Beverage',
    location_city: 'London',
    location_country: 'UK'
  },
  {
    title: 'Finance Blog Content',
    description: 'SEO-optimized content for financial advisory blog',
    needed_services: ['Content Marketing', 'SEO'],
    budget_min: 2000,
    budget_max: 5000,
    industry: 'Finance',
    location_city: 'Tokyo',
    location_country: 'Japan'
  },
  {
    title: 'Full Marketing Push Q1',
    description: 'Comprehensive marketing campaign for Q1 product launch',
    needed_services: ['PPC', 'Email Marketing', 'Brand Strategy'],
    budget_min: 10000,
    budget_max: 25000,
    industry: 'Consumer Goods',
    location_city: 'New York',
    location_country: 'USA'
  },
  {
    title: 'PPC Campaign for Gadgets',
    description: 'Targeted PPC ads for electronics marketplace',
    needed_services: ['PPC', 'SEO'],
    budget_min: 3000,
    budget_max: 7000,
    industry: 'Retail',
    location_city: 'London',
    location_country: 'UK'
  }
];

// 20 Sample Agencies
const sampleAgencies = [
  {
    company_name: 'Web Wizards',
    location_city: 'New York',
    location_country: 'USA',
    offered_services: ['Web Design', 'E-commerce Dev', 'SEO', 'Social Media'],
    budget_min: 4000,
    budget_max: 20000,
    agency_rating: 4.8,
    subscription_type: 'premium',
    experience_years: 8,
    team_size: 25
  },
  {
    company_name: 'Social Eats',
    location_city: 'London',
    location_country: 'UK',
    offered_services: ['Social Media', 'Content Marketing', 'Brand Strategy'],
    budget_min: 1000,
    budget_max: 5000,
    agency_rating: 4.5,
    subscription_type: 'basic',
    experience_years: 5,
    team_size: 12
  },
  {
    company_name: 'SEO Kings',
    location_city: 'Tokyo',
    location_country: 'Japan',
    offered_services: ['SEO', 'PPC'],
    budget_min: 3000,
    budget_max: 10000,
    agency_rating: 4.2,
    subscription_type: 'basic',
    experience_years: 6,
    team_size: 15
  },
  {
    company_name: 'Full Stack Marketing',
    location_city: 'New York',
    location_country: 'USA',
    offered_services: ['PPC', 'Email Marketing', 'Brand Strategy', 'SEO', 'Content Marketing'],
    budget_min: 8000,
    budget_max: 30000,
    agency_rating: 4.9,
    subscription_type: 'premium',
    experience_years: 10,
    team_size: 40
  },
  {
    company_name: 'High-End Branding',
    location_city: 'London',
    location_country: 'UK',
    offered_services: ['Brand Strategy', 'Web Design'],
    budget_min: 30000,
    budget_max: 100000,
    agency_rating: 5.0,
    subscription_type: 'basic',
    experience_years: 15,
    team_size: 50
  },
  {
    company_name: 'Digital Dynamos',
    location_city: 'New York',
    location_country: 'USA',
    offered_services: ['Social Media', 'PPC', 'Content Marketing'],
    budget_min: 2000,
    budget_max: 8000,
    agency_rating: 4.3,
    subscription_type: 'basic',
    experience_years: 4,
    team_size: 10
  },
  {
    company_name: 'Tokyo Tech Solutions',
    location_city: 'Tokyo',
    location_country: 'Japan',
    offered_services: ['Web Design', 'E-commerce Dev', 'SEO'],
    budget_min: 5000,
    budget_max: 18000,
    agency_rating: 4.6,
    subscription_type: 'premium',
    experience_years: 7,
    team_size: 22
  },
  {
    company_name: 'Content Creators Co',
    location_city: 'London',
    location_country: 'UK',
    offered_services: ['Content Marketing', 'SEO', 'Email Marketing'],
    budget_min: 2500,
    budget_max: 9000,
    agency_rating: 4.4,
    subscription_type: 'basic',
    experience_years: 5,
    team_size: 18
  },
  {
    company_name: 'Brand Builders',
    location_city: 'New York',
    location_country: 'USA',
    offered_services: ['Brand Strategy', 'Social Media', 'Content Marketing'],
    budget_min: 6000,
    budget_max: 15000,
    agency_rating: 4.7,
    subscription_type: 'premium',
    experience_years: 9,
    team_size: 30
  },
  {
    company_name: 'E-Shop Experts',
    location_city: 'Tokyo',
    location_country: 'Japan',
    offered_services: ['E-commerce Dev', 'Web Design', 'PPC'],
    budget_min: 4500,
    budget_max: 12000,
    agency_rating: 4.5,
    subscription_type: 'basic',
    experience_years: 6,
    team_size: 20
  },
  {
    company_name: 'Global Marketing Group',
    location_city: 'London',
    location_country: 'UK',
    offered_services: ['PPC', 'SEO', 'Email Marketing', 'Social Media'],
    budget_min: 7000,
    budget_max: 22000,
    agency_rating: 4.8,
    subscription_type: 'premium',
    experience_years: 11,
    team_size: 35
  },
  {
    company_name: 'Startup Studio',
    location_city: 'New York',
    location_country: 'USA',
    offered_services: ['Web Design', 'Brand Strategy', 'Social Media'],
    budget_min: 3000,
    budget_max: 10000,
    agency_rating: 4.1,
    subscription_type: 'basic',
    experience_years: 3,
    team_size: 8
  },
  {
    company_name: 'Asia Digital',
    location_city: 'Tokyo',
    location_country: 'Japan',
    offered_services: ['Social Media', 'Content Marketing', 'PPC'],
    budget_min: 2000,
    budget_max: 7000,
    agency_rating: 4.3,
    subscription_type: 'basic',
    experience_years: 4,
    team_size: 14
  },
  {
    company_name: 'Premium Digital',
    location_city: 'London',
    location_country: 'UK',
    offered_services: ['Web Design', 'E-commerce Dev', 'Brand Strategy', 'SEO'],
    budget_min: 10000,
    budget_max: 35000,
    agency_rating: 4.9,
    subscription_type: 'premium',
    experience_years: 12,
    team_size: 45
  },
  {
    company_name: 'Quick Launch Media',
    location_city: 'New York',
    location_country: 'USA',
    offered_services: ['Social Media', 'Email Marketing', 'Content Marketing'],
    budget_min: 1500,
    budget_max: 6000,
    agency_rating: 4.0,
    subscription_type: 'basic',
    experience_years: 3,
    team_size: 9
  },
  {
    company_name: 'SEO Masters Tokyo',
    location_city: 'Tokyo',
    location_country: 'Japan',
    offered_services: ['SEO', 'Content Marketing', 'PPC'],
    budget_min: 3500,
    budget_max: 11000,
    agency_rating: 4.6,
    subscription_type: 'premium',
    experience_years: 8,
    team_size: 24
  },
  {
    company_name: 'London Creative Labs',
    location_city: 'London',
    location_country: 'UK',
    offered_services: ['Brand Strategy', 'Web Design', 'Social Media'],
    budget_min: 5000,
    budget_max: 16000,
    agency_rating: 4.4,
    subscription_type: 'basic',
    experience_years: 6,
    team_size: 19
  },
  {
    company_name: 'All-in-One Agency',
    location_city: 'New York',
    location_country: 'USA',
    offered_services: ['SEO', 'PPC', 'Social Media', 'Email Marketing', 'Content Marketing'],
    budget_min: 5000,
    budget_max: 20000,
    agency_rating: 4.7,
    subscription_type: 'premium',
    experience_years: 9,
    team_size: 32
  },
  {
    company_name: 'Budget Marketing Pro',
    location_city: 'Tokyo',
    location_country: 'Japan',
    offered_services: ['Social Media', 'Email Marketing', 'Content Marketing'],
    budget_min: 1000,
    budget_max: 4000,
    agency_rating: 3.9,
    subscription_type: 'basic',
    experience_years: 2,
    team_size: 6
  },
  {
    company_name: 'Elite Digital Partners',
    location_city: 'London',
    location_country: 'UK',
    offered_services: ['E-commerce Dev', 'Web Design', 'SEO', 'PPC', 'Brand Strategy'],
    budget_min: 12000,
    budget_max: 40000,
    agency_rating: 5.0,
    subscription_type: 'premium',
    experience_years: 14,
    team_size: 55
  }
];

// Import data function
const importData = async () => {
  try {
    await Project.deleteMany();
    await Agency.deleteMany();

    await Project.insertMany(sampleProjects);
    await Agency.insertMany(sampleAgencies);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Destroy data function
const destroyData = async () => {
  try {
    await Project.deleteMany();
    await Agency.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Check command line arguments
if (process.argv[2] === '--destroy') {
  destroyData();
} else {
  importData();
}
