const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { createResetToken, generateToken } = require("../services/authService");

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail", // Replace with your email service
  auth: {
    user: process.env.EMAIL_USER, // Add this to your .env file
    pass: process.env.EMAIL_PASS, // Add this to your .env file
  },
});

// User login
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ error: "Invalid email or password." });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Invalid email or password." });
    const token = generateToken(user);
    res.status(200).json({ message: "Login successful.", token, user });
  } catch (error) {
    next(error);
  }
};

// User registration
exports.registerUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User with this email already exists." });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: "Registration successful.", user: newUser });
  } catch (error) {
    next(error);
  }
};

// Request password reset
exports.requestPasswordReset = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found." });

    // Create reset token and expiration time
    const resetToken = createResetToken(user._id);
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    // Send password reset email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: ${process.env.CLIENT_URL}/reset-password?token=${resetToken}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    next(error);
  }
};

// Reset password
exports.resetPassword = async (req, res, next) => {
  const { token, password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || !user.resetToken || user.resetTokenExpires < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired reset token." });
    }

    // Update password and clear reset token
    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ error: "Reset token has expired." });
    }
    next(error);
  }
};