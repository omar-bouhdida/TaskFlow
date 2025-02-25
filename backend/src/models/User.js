// File: backend/models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false }, // Exclude from queries by default
    role: {
      type: String,
      enum: ["team_member", "manager", "admin"],
      default: "team_member",
    },
    bio: { type: String, default: "" },
    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",
    },
    notifications: { type: Boolean, default: true },
    emailNotifications: { type: Boolean, default: true },
    resetToken: String, // Password reset token
    resetTokenExpires: Date, // Token expiration time
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);