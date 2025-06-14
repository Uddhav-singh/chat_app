const Group = require('../models/groupModel');
const User = require('../models/user');
const GroupMember = require('../models/groupMember');

// Create a group
const createGroup = async (req, res) => {
    try {
        const { groupName, userIds } = req.body;  // userIds are the users to be invited
        
        if (!groupName || !userIds || !userIds.length) {
            return res.status(400).json({ error: "Group name and at least one user are required." });
        }

        // Create the group
        const newGroup = await Group.create({
            name: groupName,
        });

        // Add the creator of the group to the group
        await newGroup.addUser(req.user.id);  // Assumes you have user ID in req.user (from middleware)

        // Add other users to the group
        const users = await User.findAll({
            where: {
                id: userIds,
            },
        });

        if (!users.length) {
            return res.status(404).json({ error: "Users not found." });
        }

        // Add the users to the group
        await newGroup.addUsers(users);  // 'addUsers' is generated by Sequelize with the association

        res.status(201).json({
            message: "Group created successfully.",
            data: newGroup,
        });
    } catch (err) {
        console.error("Error creating group:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Fetch all groups a user is part of
const getUserGroups = async (req, res) => {
    try {
        const groups = await req.user.getGroups();  // Assuming user is already authenticated and req.user is available
        res.status(200).json(groups);
    } catch (err) {
        console.error("Error fetching groups:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    createGroup,
    getUserGroups,
};
// This code defines a group controller for creating and fetching groups in a chat application.
// The `createGroup` function allows users to create a new group by providing a group name and a list of user IDs to invite.