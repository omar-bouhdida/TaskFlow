const express = require("express");
const router = express.Router();
const { getNotifications, markNotificationsAsRead } = require("../controllers/notificationController");

// Get notifications for a user
router.get("/:userId", getNotifications);

// Mark notifications as read
router.put("/:userId/mark-as-read", markNotificationsAsRead);

module.exports = router;