const Team = require('../models/Team'); // Assuming you have a Team model
const User = require('../models/User'); // Assuming you have a User model
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; // Ensure this is set in your environment variables

// Helper function to check if user is a team admin
async function isTeamAdmin(teamId, userId) {
  const team = await Team.findById(teamId);
  return team && team.admin.toString() === userId;
}

// Create Team
exports.createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validate input fields
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required.' });
    }

    // Save the team to the database and associate the creator as the team admin
    const newTeam = new Team({
      name,
      description,
      admin: req.user.id, // Assuming the authenticated user's ID is available in req.user.id
      members: [{ user: req.user.id, role: 'admin' }],
    });

    await newTeam.save();

    res.status(201).json({ message: 'Team created successfully.', team: newTeam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Invite Team Member
exports.inviteTeamMember = async (req, res) => {
  try {
    const { email } = req.body;
    const teamId = req.params.id;

    // Validate input fields
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    // Check if the user is a team admin
    const isAdmin = await isTeamAdmin(teamId, req.user.id);
    if (!isAdmin) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to invite members.' });
    }

    // Find the user by email
    const invitedUser = await User.findOne({ email });
    if (!invitedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the user is already a member of the team
    const team = await Team.findById(teamId);
    const isAlreadyMember = team.members.some(member => member.user.toString() === invitedUser._id.toString());
    if (isAlreadyMember) {
      return res.status(400).json({ message: 'User is already a member of the team.' });
    }

    // Generate an invitation token
    const invitationToken = jwt.sign(
      { teamId, invitedUserId: invitedUser._id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Optionally, send the invitation link via email (not implemented here)
    res.json({ message: 'Invitation sent successfully.', invitationToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Remove Team Member
exports.removeTeamMember = async (req, res) => {
  try {
    const { memberId } = req.body;
    const teamId = req.params.id;

    // Validate input fields
    if (!memberId) {
      return res.status(400).json({ message: 'Member ID is required.' });
    }

    // Check if the user is a team admin
    const isAdmin = await isTeamAdmin(teamId, req.user.id);
    if (!isAdmin) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to remove members.' });
    }

    // Remove the member from the team
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found.' });
    }

    team.members = team.members.filter(member => member.user.toString() !== memberId);
    await team.save();

    res.json({ message: 'Member removed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Get All Teams
exports.getAllTeams = async (req, res) => {
  try {
    const userId = req.user.id;

    // Retrieve all teams the user belongs to
    const teams = await Team.find({ 'members.user': userId }).populate('members.user', 'name email role');

    res.json({ teams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Get Team by ID
exports.getTeamById = async (req, res) => {
  try {
    const teamId = req.params.id;

    // Fetch details of a specific team, including its members and their roles
    const team = await Team.findById(teamId)
      .populate('members.user', 'name email role')
      .populate('admin', 'name email role');

    if (!team) {
      return res.status(404).json({ message: 'Team not found.' });
    }

    res.json({ team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};