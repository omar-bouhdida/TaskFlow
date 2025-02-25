// File: backend/utils/migration.js
require("dotenv").config({ path: __dirname + "/../../.env" }); // Adjust the path as needed

const mongoose = require("mongoose");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB for migration.");

    // Your migration logic here

    console.log("Migration completed.");
    process.exit(0);
  } catch (error) {
    console.error("Error running migration:", error.message);
    process.exit(1);
  }
})();