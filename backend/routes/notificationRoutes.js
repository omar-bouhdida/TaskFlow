const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController'); // Assuming notificationController is in the 'controllers' directory
const authMiddleware = require('../middleware/authMiddleware'); // Assuming authMiddleware is in the 'middleware' directory

// Middleware to authenticate JWT token
router.use(authMiddleware.authenticateToken);

// POST /notifications: Create a new notification (protected route)
router.post('/notifications', notificationController.createNotification);

// PUT /notifications/:id/read: Mark a notification as read (protected route)
router.put('/notifications/:id/read', notificationController.markAsRead);

// GET /notifications: Retrieve all notifications for the authenticated user (protected route)
router.get('/notifications', notificationController.getAllNotifications);

// DELETE /notifications/:id: Delete a notification (protected route)
router.delete('/notifications/:id', notificationController.deleteNotification);

module.exports = router;    