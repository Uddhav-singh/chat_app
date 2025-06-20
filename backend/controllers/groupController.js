// const Group = require('../models/groupModel');
// const User = require('../models/user');
// const GroupMember = require('../models/groupMember');

// // Create a group
// const createGroup = async (req, res) => {
//   // Ensure the user is authenticated
//   try {
//     const { groupName, userIds } = req.body;
//     const currentUserId = req.user.id;

//     if (!groupName || !userIds || userIds.length === 0) {
//       return res.status(400).json({ error: "Group name and user IDs are required." });
//     }

//     // Create group
//     const newGroup = await Group.create({
//       name: groupName,
//       createdBy: currentUserId,
//     });

//     // Add current user to group as well
//     const allUserIds = [...new Set([...userIds, currentUserId])];

//     // Create group members
//     const groupMembers = allUserIds.map((userId) => ({
//       groupId: newGroup.id,
//       userId,
//     }));
//     await GroupMember.bulkCreate(groupMembers);

//     res.status(201).json({ message: "Group created successfully" });
//   } catch (err) {
//     console.error("Group creation error:", err);
//     res.status(500).json({ error: "Failed to create group" });
//   }
// };

// // Fetch all groups a user is part of
// const getUserGroups = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const groups = await Group.findAll({
//       include: [
//         {
//           model: User,
//           as: "users", // this should match the alias used in Group.belongsToMany(User, { as: "members" })
//           where: { id: userId },
//           attributes: [], // don't fetch unnecessary user data
//           through: { attributes: [] } // exclude junction table fields
//         }
//       ]
//     });

//     res.json(groups);
//   } catch (error) {
//     console.error("Error fetching user groups:", error);
//     res.status(500).json({ error: "Failed to fetch user groups" });
//   }
// };




// // get all user to crate the group 
// // Get all users (for inviting to groups)
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.findAll({
//       attributes: ['id', 'name', 'email'], // Exclude password
//     });
//     res.json(users);
//   } catch (err) {
//     console.error("Error fetching users:", err);
//     res.status(500).json({ error: "Failed to fetch users" });
//   }
// };

// module.exports = {
//   createGroup,
//   getUserGroups,
//   getAllUsers,
// };
// // This code defines a group controller for creating and fetching groups in a chat application.
// // The `createGroup` function allows users to create a new group by providing a group name and a list of user IDs to invite.


// backend/controllers/groupController.js

const Group = require('../models/groupModel');
const User = require('../models/user');
const GroupMember = require('../models/groupMember');

// ✅ Create a group
const createGroup = async (req, res) => {
  try {
    const { groupName, userIds } = req.body;
    const currentUserId = req.user.id;

    if (!groupName || !userIds || userIds.length === 0) {
      return res.status(400).json({ error: "Group name and user IDs are required." });
    }

    // Create the group
    const newGroup = await Group.create({
      name: groupName,
      createdBy: currentUserId,
    });

    // Add current user to group along with selected members
    const allUserIds = [...new Set([...userIds, currentUserId])];
    const groupMembers = allUserIds.map((userId) => ({
      groupId: newGroup.id,
      userId,
    }));
    await GroupMember.bulkCreate(groupMembers);

    res.status(201).json({ message: "Group created successfully" });
  } catch (err) {
    console.error("Group creation error:", err);
    res.status(500).json({ error: "Failed to create group" });
  }
};

// ✅ Fetch all groups a user is part of
// const getUserGroups = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const groups = await Group.findAll({
//       include: [
//         {
//           model: GroupMember,
//           where: { userId },
//           attributes: [],
//         },
//       ],
//     });

//     res.json(groups);
//   } catch (error) {
//     console.error("Error fetching user groups:", error);
//     res.status(500).json({ error: "Failed to fetch user groups" });
//   }
// };
const getUserGroups = async (req, res) => {
  try {
    const userId = req.user.id;

    const groups = await Group.findAll({
      include: [
        {
          model: User,
          as: "users", // ✅ must match the alias defined in model/index.js
          where: { id: userId },
          attributes: [], // Exclude user details unless you need them
          through: { attributes: [] }, // Don't include join table details
        },
      ],
    });

    res.json(groups);
  } catch (error) {
    console.error("Error fetching user groups:", error);
    res.status(500).json({ error: "Failed to fetch user groups" });
  }
};


// ✅ Get all users (for inviting to groups)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email'], // Exclude password
    });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

module.exports = {
  createGroup,
  getUserGroups,
  getAllUsers,
};
// This code defines a group controller for creating and fetching groups in a chat application.
// The `createGroup` function allows users to create a new group by providing a group name and a list of user IDs to invite.
// The `getUserGroups` function retrieves all groups that the authenticated user is a member of.
// The `getAllUsers` function fetches all users in the system, excluding sensitive information like passwords.