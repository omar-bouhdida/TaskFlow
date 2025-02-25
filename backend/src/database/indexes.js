const mongoose = require("mongoose");
const User = require("../models/User");
const Task = require("../models/Task");
const Team = require("../models/Team");
const Notification = require("../models/Notification");

async function createIndexes() {
  try {
    // Unique index for User emails
    await User.collection.createIndex({ email: 1 }, { unique: true });

    // Index for Task dueDate and status
    await Task.collection.createIndex({ dueDate: 1, status: 1 });

    // Index for Team emails
    await Team.collection.createIndex({ email: 1 }, { unique: true });

    // Index for Notifications userId and isRead
    await Notification.collection.createIndex({ userId: 1, isRead: 1 });

    console.log("Indexes created successfully.");
  } catch (error) {
    console.error("Error creating indexes:", error);
  }
}

module.exports = createIndexes;