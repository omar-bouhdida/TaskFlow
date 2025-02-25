// File: backend/database/seeds/tasks.js
const mongoose = require("mongoose");
const Task = require("../../models/Task")
const User = require("../../models/User");

const seedTasks = async () => {
  try {
    await Task.deleteMany({});

    // Fetch user IDs from the database
    const [adminUser, managerUser] = await User.find({}).limit(2); // Fetch the first two users

    if (!adminUser || !managerUser) {
      throw new Error("Not enough users seeded to assign tasks.");
    }

    const tasks = [
      {
        title: "Design new landing page",
        description: "Create a modern and responsive landing page design",
        status: "in_progress",
        priority: "high",
        assignee: adminUser._id, // Use the ID of the first user
        dueDate: new Date("2024-03-25"),
      },
      {
        title: "Fix navigation bug",
        description: "Resolve the navigation issue in the mobile menu",
        status: "completed",
        priority: "medium",
        assignee: managerUser._id, // Use the ID of the second user
        dueDate: new Date("2024-03-24"),
      },
    ];

    await Task.insertMany(tasks);
    console.log("Tasks seeded successfully.");
  } catch (error) {
    console.error("Error seeding tasks:", error);
  }
};

module.exports = seedTasks;