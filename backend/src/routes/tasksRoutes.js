const express = require("express");
const router = express.Router();
const { 
    createTask,
    getTaskById,
    addCommentToTask,
    updateTask,
    getTasks,
    getRecentTasks,
    getTaskStats,
    getTaskStatistics,
} = require("../controllers/tasksController");

// Create a new task
router.post("/", createTask);

// Get all tasks
router.get("/", getTasks);

// Get recent tasks
router.get("/recent", getRecentTasks);

// Get task statistics
router.get("/stats", getTaskStats);

// Get task statistics
router.get("/statistics", getTaskStatistics);

// Get a specific task by ID (keep this last among GET routes)
router.get("/:taskId", getTaskById);

// Add a comment to a task
router.post("/:taskId/comments", addCommentToTask);

// Update task details
router.put("/:taskId", updateTask);

module.exports = router;
