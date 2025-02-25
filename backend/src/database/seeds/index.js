// File: backend/database/seeds/index.js
require("dotenv").config({ path: __dirname + "/../../.env" }); // Load environment variables

const mongoose = require("mongoose");
const seedUsers = require("./users");
const seedTasks = require("./tasks");

(async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in the .env file.");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB for seeding.");

    await seedUsers();
    await seedTasks();

    console.log("All seeds completed.");
    process.exit(0);
  } catch (error) {
    console.error("Error running seeds:", error.message);
    process.exit(1);
  }
})();