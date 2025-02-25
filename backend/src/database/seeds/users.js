const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const seedUsers = async () => {
  try {
    await User.deleteMany({});

    const hashedPassword = await bcrypt.hash("password123", 10);
    const users = [
      {
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword,
        role: "admin",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: hashedPassword,
        role: "manager",
      },
      {
        name: "Hamza Smith",
        email: "omarbouhdiida@gmail.com",
        password: "Hahhh1234",
        role: "admin",
      },
    ];

    await User.insertMany(users);
    console.log("Users seeded successfully.");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

module.exports = seedUsers;