const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: String,
  content: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["todo", "in_progress", "completed", "cancelled"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    comments: [commentSchema],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Task", taskSchema);