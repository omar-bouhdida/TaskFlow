const Notification = require("../models/Notification");

// Get notifications for a user
exports.getNotifications = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(10); // Limit to 10 notifications

    res.status(200).json({ notifications });
  } catch (error) {
    next(error);
  }
};

// Mark notifications as read
exports.markNotificationsAsRead = async (req, res, next) => {
  const { userId } = req.params;

  try {
    await Notification.updateMany(
      { userId, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({ message: "Notifications marked as read." });
  } catch (error) {
    next(error);
  }
};