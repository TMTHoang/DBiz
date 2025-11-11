const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const recommendRoutes = require('./routes/recommendRoutes');
const agencyRoutes = require('./routes/agencyRoutes');
const requestRoutes = require('./routes/requestRoutes');
const chatRoutes = require('./routes/chatRoutes');
const matchRoutes = require('./routes/matchRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Create Express app instance
const app = express();

// Apply middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend API is running...');
});

// API Routes
app.use('/api/recommend', recommendRoutes);
app.use('/api/agencies', agencyRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/match', matchRoutes);

// Error Handling Middleware (must be after all routes)
app.use(notFound);
app.use(errorHandler);

// Set port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
