const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController'); // Assuming taskController is in the 'controllers' directory
const authMiddleware = require('../middleware/authMiddleware'); // Assuming authMiddleware is in the 'middleware' directory

// Middleware to authenticate JWT token
router.use(authMiddleware.authenticateToken);

// GET /tasks/stats: Return task statistics (total, completed, in progress, canceled)
router.get('/stats', taskController.getTaskStatistics);

// GET /tasks/progress: Return task progress data grouped by days of the week
router.get('/progress', taskController.getTaskProgressData);

// GET /tasks/recent: Fetch the latest tasks with assigned users and statuses
router.get('/recent', taskController.getRecentTasks);

module.exports = router;