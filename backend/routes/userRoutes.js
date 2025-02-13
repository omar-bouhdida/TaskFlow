const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Assuming userController is in the 'controllers' directory
const authMiddleware = require('../middleware/authMiddleware'); // Assuming authMiddleware is in the 'middleware' directory

// Middleware to authenticate JWT token
router.use(authMiddleware.authenticateToken);

// PUT /profile: Update user profile settings (protected route)
router.put('/profile', userController.updateUserProfile);

module.exports = router;