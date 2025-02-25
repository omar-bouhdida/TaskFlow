const express = require("express");
const router = express.Router();
const { updateUserSettings } = require("../controllers/settingsController");

// Update user settings
router.put("/", updateUserSettings);

module.exports = router;