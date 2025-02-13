const express = require('express');
const router = express.Router();
const authController = require('./authController');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; // Ensure this is set in your environment variables

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
    req.user = user; // Attach decoded user data to the request object
    next();
  });
}

// POST /register: Route for user registration
router.post('/register', authController.registerUser);

// POST /login: Route for user login
router.post('/login', authController.loginUser);

// GET /profile: Protected route to fetch logged-in user's profile details
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user details from the database (excluding sensitive information like password)
    const user = await User.findById(userId, '-password'); // Assuming you have a User model

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;