const Notification = require('../models/Notification'); // Assuming you have a Notification model
const Task = require('../models/Task'); // Assuming you have a Task model
const User = require('../models/User'); // Assuming you have a User model

// Helper function to check if user owns the notification
async function isNotificationOwner(notificationId, userId) {
  const notification = await Notification.findById(notificationId);
  return notification && notification.user.toString() === userId;
}

// Create Notification
exports.createNotification = async (req, res) => {
  try {
    const { type, taskId, message } = req.body;

    // Validate input fields
    if (!type || !taskId || !message) {
      return res.status(400).json({ message: 'Type, taskId, and message are required.' });
    }

    // Ensure the task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    // Determine the recipient based on the notification type
    let recipientId;
    if (type === 'assigned') {
      recipientId = task.assignedTo; // Notify the assigned user
    } else if (type === 'updated' || type === 'commented') {
      recipientId = task.creator; // Notify the creator of the task
    } else {
      return res.status(400).json({ message: 'Invalid notification type.' });
    }

    // Save the notification to the database
    const newNotification = new Notification({
      user: recipientId,
      type,
      taskId,
      message,
      isRead: false,
    });

    await newNotification.save();

    res.status(201).json({ message: 'Notification created successfully.', notification: newNotification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Mark as Read
exports.markAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;

    // Check if the user owns the notification
    const isOwner = await isNotificationOwner(notificationId, req.user.id);
    if (!isOwner) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to mark this notification as read.' });
    }

    // Update the notification as read
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found.' });
    }

    res.json({ message: 'Notification marked as read.', notification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Get All Notifications
exports.getAllNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    // Retrieve all notifications for the authenticated user
    const notifications = await Notification.find({ user: userId })
      .populate('taskId', 'title status') // Populate task details (e.g., title and status)
      .sort({ createdAt: -1 }); // Sort by most recent first

    res.json({ notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Delete Notification
exports.deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;

    // Check if the user owns the notification
    const isOwner = await isNotificationOwner(notificationId, req.user.id);
    if (!isOwner) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to delete this notification.' });
    }

    // Delete the notification
    const deletedNotification = await Notification.findByIdAndDelete(notificationId);

    if (!deletedNotification) {
      return res.status(404).json({ message: 'Notification not found.' });
    }

    res.json({ message: 'Notification deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};