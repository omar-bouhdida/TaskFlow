const User = require("../models/User");

// Update user settings
exports.updateUserSettings = async (req, res, next) => {
  const { name, email, bio, theme, notifications, emailNotifications } = req.body;

  try {
    // Assuming we have an authenticated user ID in `req.user._id`
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        bio,
        theme,
        notifications,
        emailNotifications,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "Settings updated successfully.", user: updatedUser });
  } catch (error) {
    next(error);
  }
};