const jwt = require("jsonwebtoken");

// Function to generate a password reset token
const createResetToken = (userId) => {
  return jwt.sign({ userId }, process.env.RESET_TOKEN_SECRET, { expiresIn: "15m" });
};

// Function to generate a JWT token for authentication
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = {
  createResetToken,
  generateToken,
};