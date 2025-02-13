const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'Type is required'],
      enum: ['Task Assigned', 'Task Updated', 'Comment Added'], // Restrict to valid types
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Recipient is required'],
    },
    read: {
      type: Boolean,
      default: false,
      required: true,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Notification', notificationSchema);