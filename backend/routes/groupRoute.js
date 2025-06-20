const express = require("express");
const router = express.Router();
const groupController = require('../controllers/groupController');

// Middleware to authenticate user
const authMiddleware = require('../middleware/authMiddleware');

// Routes
router.post('/create', authMiddleware, groupController.createGroup);  // Creating a new group
router.get('/user', authMiddleware, groupController.getUserGroups);  // Get all groups user is part of


// Route: GET /api/group/users
router.get('/users', authMiddleware, groupController.getAllUsers);

module.exports = router;
// This code sets up the group routes for creating a group and fetching user groups.
// It uses an authentication middleware to ensure that only authenticated users can access these routes.