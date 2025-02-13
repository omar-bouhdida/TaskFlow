const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'], // Ensures the field is mandatory
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId, // References the User model
      ref: 'User', // Relationship to the User model
      required: [true, 'AssignedTo is required'], // Ensures the field is mandatory
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed', 'Canceled'], // Restricts valid values
      default: 'Pending', // Default value if not provided
      required: [true, 'Status is required'], // Ensures the field is mandatory
    },
    dueDate: {
      type: Date, // Optional due date
    },
    createdAt: {
      type: Date,
      default: Date.now, // Default value set to the current timestamp
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Export the Task model
module.exports = mongoose.model('Task', taskSchema);