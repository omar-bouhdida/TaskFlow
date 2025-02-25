const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/authMiddleware");
const { authorizeRole } = require("../middlewares/rbacMiddleware");

// Dashboard route (accessible to all authenticated users)
router.get("/", authenticateUser, (req, res) => {
  res.status(200).json({ message: "Welcome to the dashboard!" });
});

// Tasks route (accessible to all authenticated users)
router.get("/tasks", authenticateUser, (req, res) => {
  res.status(200).json({ message: "Tasks page loaded successfully." });
});

// Team route (accessible to managers and admins)
router.get("/team", [authenticateUser, authorizeRole("manager", "admin")], (req, res) => {
  res.status(200).json({ message: "Team page loaded successfully." });
});

// Settings route (accessible to admins only)
router.get("/settings", [authenticateUser, authorizeRole("admin")], (req, res) => {
  res.status(200).json({ message: "Settings page loaded successfully." });
});

module.exports = router;