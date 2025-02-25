const Team = require("../models/Team");

// Fetch all team members
exports.getTeamMembers = async (req, res, next) => {
  try {
    const members = await Team.find();
    res.status(200).json({ members });
  } catch (error) {
    next(error);
  }
};

// Invite a new team member
exports.inviteTeamMember = async (req, res, next) => {
  const { email, role } = req.body;

  try {
    // Check if the user already exists in the team
    const existingMember = await Team.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ error: "User already exists in the team." });
    }

    // Create a new team member
    const newMember = new Team({ email, role });
    await newMember.save();

    res.status(201).json({ message: "Invitation sent successfully." });
  } catch (error) {
    next(error);
  }
};