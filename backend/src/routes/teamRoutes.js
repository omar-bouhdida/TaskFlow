const express = require("express");
const router = express.Router();
const { getTeamMembers, inviteTeamMember } = require("../controllers/teamController");

// Get all team members
router.get("/", getTeamMembers);

// Invite a new team member
router.post("/invite", inviteTeamMember);

module.exports = router;