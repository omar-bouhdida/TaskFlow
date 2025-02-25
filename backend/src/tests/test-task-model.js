// File: backend/test-task-model.js
require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const Task = require("../models/Task");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");
    console.log("Task model loaded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error testing Task model:", error);
    process.exit(1);
  }
})();