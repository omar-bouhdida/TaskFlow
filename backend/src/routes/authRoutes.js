const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  requestPasswordReset,
  resetPassword,
} = require("../controllers/authController");

// User login
router.post("/login", loginUser);

// User registration
router.post("/register", registerUser);

// Request password reset
router.post("/forgot-password", requestPasswordReset);

// Reset password
router.post("/reset-password", resetPassword);

module.exports = router;
