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
    team_size: 25,
    employment_type: 'Full time',
    availability_status: 'Available',
    about: 'Web Wizards is a leading digital agency specializing in creating stunning websites and e-commerce solutions. With over 8 years of experience, we have helped hundreds of businesses transform their online presence and achieve measurable growth.',
    value_proposition: 'We deliver cutting-edge web solutions that drive conversions and revenue. Our data-driven approach ensures every project not only looks great but performs exceptionally, with an average 40% increase in client sales within the first year.'
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
    team_size: 12,
    about: 'Social Eats specializes in food and beverage industry marketing. Our team of creative storytellers understands the unique challenges of the F&B sector and crafts compelling social media campaigns that make mouths water.',
    value_proposition: 'We help restaurants and food brands build engaged communities and drive foot traffic. Our clients see an average 3x increase in social media engagement and a 25% boost in customer visits within 3 months.'
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
    team_size: 15,
    about: 'SEO Kings is Tokyo\'s premier search engine optimization agency. We combine technical SEO expertise with strategic PPC management to dominate search results and drive qualified traffic to your business.',
    value_proposition: 'Our proven strategies consistently rank clients on the first page of Google within 4-6 months. We focus on sustainable, white-hat techniques that deliver long-term results and ROI of 300% or more.'
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
    team_size: 40,
    about: 'Full Stack Marketing is a comprehensive digital marketing agency offering end-to-end solutions for businesses of all sizes. With a decade of experience and a team of 40 specialists, we handle everything from strategy to execution.',
    value_proposition: 'We provide integrated marketing solutions that work together seamlessly. Our holistic approach has helped clients achieve 250% revenue growth, reduce customer acquisition costs by 40%, and build sustainable competitive advantages.'
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
    team_size: 50,
    about: 'High-End Branding is London\'s most prestigious branding agency, serving Fortune 500 companies and luxury brands. With 15 years of excellence, we create iconic brand identities that stand the test of time.',
    value_proposition: 'We craft premium brand experiences that command higher prices and fierce customer loyalty. Our clients enjoy 50% higher brand recognition and premium pricing power that increases profit margins by 30-60%.'
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
    team_size: 10,
    about: 'Digital Dynamos is a young, energetic agency that brings fresh perspectives to digital marketing. We specialize in working with startups and small businesses to create impactful campaigns on lean budgets.',
    value_proposition: 'We deliver enterprise-level results at startup-friendly prices. Our agile approach and creative thinking help small businesses compete with larger competitors, typically achieving 150% growth in online visibility within 6 months.'
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
    team_size: 22,
    about: 'Tokyo Tech Solutions combines Japanese precision with cutting-edge technology. We build sophisticated e-commerce platforms and websites that excel in both aesthetics and performance, serving clients across Asia-Pacific.',
    value_proposition: 'We create high-converting digital experiences optimized for Asian markets. Our solutions typically increase conversion rates by 45% and reduce cart abandonment by 35%, directly impacting your bottom line.'
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
    team_size: 18,
    about: 'Content Creators Co is a content-first marketing agency that believes in the power of storytelling. Our team of writers, strategists, and SEO experts craft compelling narratives that resonate with audiences and search engines alike.',
    value_proposition: 'We turn content into revenue-generating assets. Our strategic content marketing programs generate 3x more leads than traditional marketing while costing 62% less, with content that continues to perform for years.'
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
    team_size: 30,
    about: 'Brand Builders specializes in creating and revitalizing brands for the digital age. With 9 years of experience, we\'ve helped over 200 companies define their unique voice and connect authentically with their target audiences.',
    value_proposition: 'We build brands that people love and remember. Our comprehensive brand strategies increase customer lifetime value by 50% and create passionate brand advocates who drive organic growth through word-of-mouth.'
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
    team_size: 20,
    about: 'E-Shop Experts is dedicated exclusively to e-commerce success. We build, optimize, and market online stores using the latest technologies and proven conversion optimization techniques.',
    value_proposition: 'We specialize in turning browsers into buyers. Our e-commerce solutions average 38% higher conversion rates than industry standards, with seamless checkout experiences that reduce abandonment and maximize revenue.'
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
    team_size: 35,
    about: 'Global Marketing Group brings international expertise to digital marketing. With offices worldwide and 11 years of experience, we help businesses expand into new markets and dominate their existing ones.',
    value_proposition: 'We deliver measurable growth across all digital channels. Our multi-channel approach generates 4x ROI on average, with sophisticated tracking and optimization that ensures every dollar works harder for your business.'
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
    team_size: 8,
    about: 'Startup Studio understands the unique challenges of launching and growing a startup. We\'re a lean, scrappy team that has helped dozens of early-stage companies build their brand and gain traction.',
    value_proposition: 'We offer startup-friendly packages that deliver maximum impact with minimal budget. Our approach has helped clients secure funding, launch successfully, and achieve product-market fit 2x faster than average.'
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
    team_size: 14,
    about: 'Asia Digital specializes in social-first marketing strategies tailored for Asian markets. We understand local platforms, cultural nuances, and what makes content go viral in this dynamic region.',
    value_proposition: 'We help brands win in competitive Asian markets. Our culturally-informed strategies generate 200% higher engagement rates and build authentic connections with local audiences that translate to loyal customers.'
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
    team_size: 45,
    about: 'Premium Digital is an award-winning full-service agency with 12 years of excellence. We serve ambitious brands that demand the highest quality in design, development, and digital strategy.',
    value_proposition: 'We create digital experiences that win awards and drive results. Our premium solutions combine stunning design with powerful technology, delivering 250% average ROI and industry-leading user satisfaction scores.'
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
    team_size: 9,
    about: 'Quick Launch Media specializes in rapid-deployment marketing campaigns for time-sensitive launches. Our nimble team moves fast without sacrificing quality, perfect for product launches and seasonal campaigns.',
    value_proposition: 'We get campaigns live in days, not weeks. Our speed-to-market advantage has helped clients capitalize on trends, beat competitors to launch, and achieve 180% faster customer acquisition during critical launch windows.'
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
    team_size: 24,
    about: 'SEO Masters Tokyo is the leading search marketing agency in Japan. We combine deep technical SEO knowledge with content excellence and paid search expertise to dominate both organic and paid search results.',
    value_proposition: 'We consistently deliver first-page rankings and profitable PPC campaigns. Our integrated search strategy generates 320% ROI on average, with sustainable organic traffic growth that reduces long-term customer acquisition costs by 60%.'
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
    team_size: 19,
    about: 'London Creative Labs is where strategy meets creativity. We\'re a design-led agency that creates beautiful, strategic brand experiences. Our work has won multiple industry awards and delighted clients across sectors.',
    value_proposition: 'We create brands and digital experiences that stand out in crowded markets. Our strategic creative approach increases brand recall by 65% and generates significantly higher customer engagement than generic marketing.'
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
    team_size: 32,
    about: 'All-in-One Agency is your single partner for complete digital marketing. We handle everything under one roof, eliminating the hassle of coordinating multiple vendors while ensuring all channels work together seamlessly.',
    value_proposition: 'We deliver integrated marketing that amplifies results across all channels. Our unified approach generates 40% better results than siloed tactics, with one point of contact, one strategy, and one team focused on your success.'
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
    team_size: 6,
    about: 'Budget Marketing Pro proves that effective marketing doesn\'t require huge budgets. We\'re experts at maximizing impact with minimal spend, perfect for small businesses and startups watching every dollar.',
    value_proposition: 'We deliver professional marketing results at prices small businesses can afford. Our efficient processes and focus on high-impact, low-cost tactics help clients achieve 200% growth without breaking the bank.'
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
    team_size: 55,
    about: 'Elite Digital Partners is London\'s premier full-service digital agency. With 14 years of excellence and a team of 55 specialists, we serve high-growth companies and established brands that demand the absolute best.',
    value_proposition: 'We create digital excellence that drives exponential growth. Our comprehensive solutions combine award-winning design, cutting-edge technology, and proven marketing strategies to deliver average revenue increases of 300% within 18 months.'  },
  // Additional 30 agencies for better matching coverage
  {
    company_name: 'SEO Gurus NYC',
    location_city: 'New York',
    location_country: 'USA',
    offered_services: ['SEO', 'Content Marketing'],
    budget_min: 2500,
    budget_max: 8000,
    agency_rating: 4.5,
    subscription_type: 'basic',
    experience_years: 6,
    team_size: 12
  },
  {
    company_name: 'Social Media Ninjas',
    location_city: 'London',
    location_country: 'UK',
    offered_services: ['Social Media', 'Email Marketing'],
    budget_min: 1500,
    budget_max: 5000,
    agency_rating: 4.3,
    subscription_type: 'premium',
    experience_years: 4,
    team_size: 10
  },
  {
    company_name: 'Tokyo Web Masters',
    location_city: 'Tokyo',
    location_country: 'Japan',
    offered_services: ['Web Design', 'E-commerce Dev'],
    budget_min: 4000,
    budget_max: 12000,
    agency_rating: 4.7,
    subscription_type: 'basic',
    experience_years: 7,
    team_size: 18
  },
  {
    company_name: 'PPC Pros International',
    location_city: 'New York',
    location_country: 'USA',
    offered_services: ['PPC', 'Brand Strategy'],
    budget_min: 3000,
    budget_max: 10000,
    agency_rating: 4.6,
    subscription_type: 'premium',
    experience_years: 8,
    team_size: 20
  },
  {
    company_name: 'Content Kings',
    location_city: 'London',
    location_country: 'UK',
    offered_services: ['Content Marketing', 'SEO', 'Social Media'],
    budget_min: 2000,
    budget_max: 7000,
    agency_rating: 4.4,
    subscription_type: 'basic',
    experience_years: 5,
    team_size: 15
  },
  {
    company_name: 'E-commerce Elite Tokyo',
    location_city: 'Tokyo',
    location_country: 'Japan',
    offered_services: ['E-commerce Dev', 'Web Design', 'SEO'],
    budget_min: 5000,
    budget_max: 15000,
    agency_rating: 4.8,
    subscription_type: 'premium',
    experience_years: 9,
    team_size: 28
  },
  {
    company_name: 'Brand Architects',
    location_city: 'New York',
    location_country: 'USA',
    offered_services: ['Brand Strategy', 'Social Media', 'Email Marketing'],
    budget_min: 4000,
    budget_max: 12000,
    agency_rating: 4.5,
    subscription_type: 'basic',
    experience_years: 7,
    team_size: 16
  },
  {
    company_name: 'Digital Growth Lab',
    location_city: 'London',
    location_country: 'UK',
    offered_services: ['SEO', 'PPC', 'Content Marketing'],
    budget_min: 3500,
    budget_max: 11000,
    agency_rating: 4.7,
    subscription_type: 'premium',
    experience_years: 6,
    team_size: 22
  },
  {
    company_name: 'Tokyo Social Hub',
    location_city: 'Tokyo',
    location_country: 'Japan',
    offered_services: ['Social Media', 'Content Marketing', 'Brand Strategy'],
    budget_min: 2500,
    budget_max: 8000,
    agency_rating: 4.4,
    subscription_type: 'basic',
    experience_years: 5,
    team_size: 14
  },
  {
    company_name: 'Web Design Studio',
    location_city: 'New York',
    location_country: 'USA',
    offered_services: ['Web Design', 'E-commerce Dev', 'Brand Strategy'],
    budget_min: 6000,
    budget_max: 18000,
    agency_rating: 4.6,
    subscription_type: 'premium',
    experience_years: 10,
    team_size: 25
  },
  {
    company_name: 'Email Marketing Experts',
    location_city: 'London',
    location_country: 'UK',
    offered_services: ['Email Marketing', 'Content Marketing', 'Social Media'],
    budget_min: 1500,
    budget_max: 6000,
    agency_rating: 4.3,
    subscription_type: 'basic',
    experience_years: 4,
    team_size: 11
  },
  {
    company_name: 'SEO Tokyo Pro',
    location_city: 'Tokyo',
    location_country: 'Japan',
    offered_services: ['SEO', 'PPC', 'Web Design'],
    budget_min: 4000,
    budget_max: 13000,
    agency_rating: 4.7,
    subscription_type: 'premium',
    experience_years: 8,
    team_size: 20
  },
  {
    company_name: 'Performance Marketing NYC',
    location_city: 'New York',
    location_country: 'USA',
    offered_services: ['PPC', 'SEO', 'Email Marketing'],
    budget_min: 3000,
    budget_max: 9000,
    agency_rating: 4.5,
    subscription_type: 'basic',
    experience_years: 6,
    team_size: 17
  },
  {
    company_name: 'Creative Content Lab',
    location_city: 'London',
    location_country: 'UK',
    offered_services: ['Content Marketing', 'Brand Strategy', 'Social Media'],
    budget_min: 2500,
    budget_max: 8000,
    agency_rating: 4.6,
    subscription_type: 'premium',
    experience_years: 7,
    team_size: 19
  },
  {
    company_name: 'E-Shop Builders',
    location_city: 'Tokyo',
    location_country: 'Japan',
    offered_services: ['E-commerce Dev', 'Web Design', 'PPC'],
    budget_min: 5000,
    budget_max: 14000,
    agency_rating: 4.8,
    subscription_type: 'basic',
    experience_years: 9,
    team_size: 24
  },
  {
    company_name: 'Integrated Marketing Solutions',
    location_city: 'New York',
    location_country: 'USA',
    offered_services: ['SEO', 'Social Media', 'Email Marketing', 'Content Marketing'],
    budget_min: 4500,
    budget_max: 15000,
    agency_rating: 4.7,
    subscription_type: 'premium',
    experience_years: 10,
    team_size: 30
  },
  {
    company_name: 'London Digital Works',
    location_city: 'London',
    location_country: 'UK',
    offered_services: ['Web Design', 'SEO', 'Brand Strategy'],
    budget_min: 4000,
    budget_max: 12000,
    agency_rating: 4.5,
    subscription_type: 'basic',
    experience_years: 6,
    team_size: 18
  },
  {
    company_name: 'Tokyo Marketing Force',
    location_city: 'Tokyo',
    location_country: 'Japan',
    offered_services: ['PPC', 'Social Media', 'Content Marketing'],
    budget_min: 3000,
    budget_max: 10000,
    agency_rating: 4.6,
    subscription_type: 'premium',
    experience_years: 7,
    team_size: 21
  },
  {
    company_name: 'Brand Boost NYC',
    location_city: 'New York',
    location_country: 'USA',
    offered_services: ['Brand Strategy', 'Content Marketing', 'Social Media'],
    budget_min: 3500,
    budget_max: 11000,
    agency_rating: 4.4,
    subscription_type: 'basic',
    experience_years: 5,
    team_size: 13
  },
  {
    company_name: 'Search Engine Masters',
    location_city: 'London',
    location_country: 'UK',
    offered_services: ['SEO', 'PPC', 'Content Marketing'],
    budget_min: 3000,
    budget_max: 9000,
    agency_rating: 4.6,
    subscription_type: 'premium',
    experience_years: 8,
    team_size: 23
  },
  {
    company_name: 'Tokyo E-commerce Hub',
    location_city: 'Tokyo',
    location_country: 'Japan',
    offered_services: ['E-commerce Dev', 'Web Design', 'SEO', 'Email Marketing'],
    budget_min: 6000,
    budget_max: 20000,
    agency_rating: 4.9,
    subscription_type: 'premium',
    experience_years: 11,
    team_size: 35
  },
  {
    company_name: 'Social Growth Agency',
    location_city: 'New York',
    location_country: 'USA',
    offered_services: ['Social Media', 'Content Marketing', 'Email Marketing'],
    budget_min: 2000,
    budget_max: 7000,
    agency_rating: 4.3,
    subscription_type: 'basic',
    experience_years: 4,
    team_size: 12
  },
  {
    company_name: 'Digital Presence London',
    location_city: 'London',
    location_country: 'UK',
    offered_services: ['Web Design', 'SEO', 'Social Media'],
    budget_min: 3500,
    budget_max: 10000,
    agency_rating: 4.5,
    subscription_type: 'basic',
    experience_years: 6,
    team_size: 16
  },
  {
    company_name: 'Tokyo Brand Studio',
    location_city: 'Tokyo',
    location_country: 'Japan',
    offered_services: ['Brand Strategy', 'Web Design', 'Content Marketing'],
    budget_min: 5000,
    budget_max: 16000,
    agency_rating: 4.7,
    subscription_type: 'premium',
    experience_years: 9,
    team_size: 26
  },
  {
    company_name: 'Pay Per Click NYC',
    location_city: 'New York',
    location_country: 'USA',
    offered_services: ['PPC', 'Email Marketing', 'SEO'],
    budget_min: 2500,
    budget_max: 8000,
    agency_rating: 4.4,
    subscription_type: 'basic',
    experience_years: 5,
    team_size: 14
  },
  {
    company_name: 'Full Service Digital UK',
    location_city: 'London',
    location_country: 'UK',
    offered_services: ['SEO', 'PPC', 'Social Media', 'Content Marketing', 'Web Design'],
    budget_min: 5000,
    budget_max: 18000,
    agency_rating: 4.8,
    subscription_type: 'premium',
    experience_years: 10,
    team_size: 32
  },
  {
    company_name: 'Commerce Pro Tokyo',
    location_city: 'Tokyo',
    location_country: 'Japan',
    offered_services: ['E-commerce Dev', 'PPC', 'SEO'],
    budget_min: 4500,
    budget_max: 13000,
    agency_rating: 4.6,
    subscription_type: 'basic',
    experience_years: 7,
    team_size: 19
  },
  {
    company_name: 'Strategic Marketing NYC',
    location_city: 'New York',
    location_country: 'USA',
    offered_services: ['Brand Strategy', 'Email Marketing', 'Social Media', 'Content Marketing'],
    budget_min: 4000,
    budget_max: 14000,
    agency_rating: 4.7,
    subscription_type: 'premium',
    experience_years: 9,
    team_size: 27
  },
  {
    company_name: 'Web Wizards London',
    location_city: 'London',
    location_country: 'UK',
    offered_services: ['Web Design', 'E-commerce Dev', 'Brand Strategy'],
    budget_min: 5000,
    budget_max: 15000,
    agency_rating: 4.6,
    subscription_type: 'basic',
    experience_years: 8,
    team_size: 22
  },
  {
    company_name: 'Tokyo Digital Pro',
    location_city: 'Tokyo',
    location_country: 'Japan',
    offered_services: ['SEO', 'Social Media', 'Email Marketing'],
    budget_min: 2500,
    budget_max: 8000,
    agency_rating: 4.5,
    subscription_type: 'premium',
    experience_years: 6,
    team_size: 17  }
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
