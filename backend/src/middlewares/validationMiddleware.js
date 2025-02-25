const expressValidator = require("express-validator");

exports.validateInviteRequest = [
  expressValidator.body("email").isEmail().withMessage("Invalid email address"),
  expressValidator.body("role")
    .isIn(["team_member", "manager", "admin"])
    .withMessage("Invalid role"),
];
const expressValidator = require("express-validator");

exports.validateTaskRequest = [
  expressValidator.body("title").notEmpty().withMessage("Title is required"),
  expressValidator.body("description").notEmpty().withMessage("Description is required"),
  expressValidator.body("status").isIn(["todo", "in_progress", "completed"]).withMessage("Invalid status"),
  expressValidator.body("priority").isIn(["low", "medium", "high"]).withMessage("Invalid priority"),
  expressValidator.body("assignee").notEmpty().withMessage("Assignee is required"),
  expressValidator.body("dueDate").isISO8601().withMessage("Due date must be in ISO 8601 format"),
];

exports.validateCommentRequest = [
  expressValidator.body("user").notEmpty().withMessage("User is required"),
  expressValidator.body("content").notEmpty().withMessage("Content is required"),
];

exports.validateUpdateTaskRequest = [
  expressValidator.body("status").optional().isIn(["todo", "in_progress", "completed"]).withMessage("Invalid status"),
  expressValidator.body("dueDate").optional().isISO8601().withMessage("Due date must be in ISO 8601 format"),
];

exports.validateSettingsRequest = [
  expressValidator.body("name").isLength({ min: 2 }).withMessage("Name must be at least 2 characters."),
  expressValidator.body("email").isEmail().withMessage("Invalid email address."),
  expressValidator.body("theme").isIn(["light", "dark", "system"]).withMessage("Invalid theme value."),
];

exports.validateLoginRequest = [
  expressValidator.body("email").isEmail().withMessage("Invalid email address."),
  expressValidator.body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters."),
];

exports.validateRegisterRequest = [
  expressValidator.body("name").isLength({ min: 2 }).withMessage("Name must be at least 2 characters."),
  expressValidator.body("email").isEmail().withMessage("Invalid email address."),
  expressValidator.body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters."),
  expressValidator.body("role").isIn(["team_member", "manager", "admin"]).withMessage("Please select a valid role."),
];