const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController'); // Assuming teamController is in the 'controllers' directory
const authMiddleware = require('../middleware/authMiddleware'); // Assuming authMiddleware is in the 'middleware' directory

// Middleware to authenticate JWT token
router.use(authMiddleware.authenticateToken);

// POST /teams: Create a new team (protected route)
router.post('/teams', teamController.createTeam);

// POST /teams/:id/invite: Invite a user to the team (protected route)
router.post('/teams/:id/invite', teamController.inviteTeamMember);

// DELETE /teams/:id/members/:userId: Remove a user from the team (protected route)
router.delete('/teams/:id/members/:userId', teamController.removeTeamMember);

// GET /teams: Retrieve all teams for the authenticated user (protected route)
router.get('/teams', teamController.getAllTeams);

// GET /teams/:id: Retrieve details of a specific team (protected route)
router.get('/teams/:id', teamController.getTeamById);

module.exports = router;