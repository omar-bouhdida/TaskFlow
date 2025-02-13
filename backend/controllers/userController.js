const User = require('../models/User'); // Assuming you have a User model

// Update User Profile Settings
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, email, bio, theme, pushNotifications, emailNotifications } = req.body;

    // Validate input fields
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    // Ensure the email format is valid (optional: add regex validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Find the user by ID (assuming the authenticated user's ID is available in req.user.id)
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the email is already taken by another user
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    // Update user fields
    user.name = name;
    user.email = email;
    user.bio = bio || ''; // Set to empty string if bio is not provided
    user.theme = theme || 'light'; // Default to 'light' if theme is not provided
    user.pushNotifications = pushNotifications !== undefined ? pushNotifications : true; // Default to true
    user.emailNotifications = emailNotifications !== undefined ? emailNotifications : true; // Default to true

    // Save the updated user
    await user.save();

    res.json({ message: 'Profile updated successfully.', user: user.toObject() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};