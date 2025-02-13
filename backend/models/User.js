const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'], // Ensures the field is mandatory
    },
    email: {
      type: String,
      required: [true, 'Email is required'], // Ensures the field is mandatory
      unique: true, // Ensures email uniqueness
      lowercase: true, // Converts email to lowercase
      trim: true, // Removes whitespace
    },
    password: {
      type: String,
      required: [true, 'Password is required'], // Ensures the field is mandatory
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'team_member'], // Restricts valid values
      default: 'team_member', // Default value if not provided
    },
    bio: {
      type: String, // User's biography or description
      default: '', // Default to an empty string if not provided
    },
    theme: {
      type: String, // User's preferred theme (e.g., 'light', 'dark')
      default: 'light', // Default to 'light' theme if not provided
    },
    pushNotifications: {
      type: Boolean, // Whether the user enables push notifications
      default: true, // Default to enabled
    },
    emailNotifications: {
      type: Boolean, // Whether the user enables email notifications
      default: true, // Default to enabled
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Export the User model
module.exports = mongoose.model('User', userSchema);