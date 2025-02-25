// File: backend/server.js
require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const createIndexes = require('./database/indexes');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Create indexes
createIndexes();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/tasksRoutes'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});