// // backend/controllers/groupController.js

// const Group = require('../models/groupModel');
// const User = require('../models/user');
// const GroupMember = require('../models/groupMember');

// // ✅ Create a group
// const createGroup = async (req, res) => {
//   try {
//     const { groupName, userIds } = req.body;
//     const currentUserId = req.user.id;

//     if (!groupName || !userIds || userIds.length === 0) {
//       return res.status(400).json({ error: "Group name and user IDs are required." });
//     }

//     // Create the group
//     const newGroup = await Group.create({
//       name: groupName,
//       createdBy: currentUserId,
//     });

//     // Add current user to group along with selected members
//     const allUserIds = [...new Set([...userIds, currentUserId])];
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

// // ✅ Fetch all groups a user is part of
// // const getUserGroups = async (req, res) => {
// //   try {
// //     const userId = req.user.id;

// //     const groups = await Group.findAll({
// //       include: [
// //         {
// //           model: GroupMember,
// //           where: { userId },
// //           attributes: [],
// //         },
// //       ],
// //     });

// //     res.json(groups);
// //   } catch (error) {
// //     console.error("Error fetching user groups:", error);
// //     res.status(500).json({ error: "Failed to fetch user groups" });
// //   }
// // };
// const getUserGroups = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const groups = await Group.findAll({
//       include: [
//         {
//           model: User,
//           as: "users", // ✅ must match the alias defined in model/index.js
//           where: { id: userId },
//           attributes: [], // Exclude user details unless you need them
//           through: { attributes: [] }, // Don't include join table details
//         },
//       ],
//     });

//     res.json(groups);
//   } catch (error) {
//     console.error("Error fetching user groups:", error);
//     res.status(500).json({ error: "Failed to fetch user groups" });
//   }
// };


// // ✅ Get all users (for inviting to groups)
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
      isAdmin: userId === currentUserId, // ✅ Set creator as admin
    }));
    await GroupMember.bulkCreate(groupMembers);

    res.status(201).json({ message: "Group created successfully" });
  } catch (err) {
    console.error("Group creation error:", err);
    res.status(500).json({ error: "Failed to create group" });
  }
};

// ✅ Fetch all groups a user is part of
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

// ✅ Promote a member to admin
const promoteToAdmin = async (req, res) => {
  try {
    const { groupId, userId } = req.params;
    const currentUserId = req.user.id;

    const requester = await GroupMember.findOne({ where: { groupId, userId: currentUserId } });
    if (!requester || !requester.isAdmin) {
      return res.status(403).json({ error: "Only admins can promote members." });
    }

    await GroupMember.update({ isAdmin: true }, { where: { groupId, userId } });
    res.json({ message: "User promoted to admin." });
  } catch (error) {
    console.error("Error promoting user:", error);
    res.status(500).json({ error: "Failed to promote user" });
  }
};

// ✅ Remove a user from group
const removeUserFromGroup = async (req, res) => {
  try {
    const { groupId, userId } = req.params;
    const currentUserId = req.user.id;

    const requester = await GroupMember.findOne({ where: { groupId, userId: currentUserId } });
    if (!requester || !requester.isAdmin) {
      return res.status(403).json({ error: "Only admins can remove users." });
    }

    await GroupMember.destroy({ where: { groupId, userId } });
    res.json({ message: "User removed from group." });
  } catch (error) {
    console.error("Error removing user:", error);
    res.status(500).json({ error: "Failed to remove user" });
  }
};

// ✅ Get all members of a group with admin status
const getGroupMembers = async (req, res) => {
  try {
    const { groupId } = req.params;
    const members = await GroupMember.findAll({
      where: { groupId },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    res.json(members);
  } catch (error) {
    console.error("Error fetching group members:", error);
    res.status(500).json({ error: "Failed to fetch group members" });
  }
};

module.exports = {
  createGroup,
  getUserGroups,
  getAllUsers,
  promoteToAdmin,
  removeUserFromGroup,
  getGroupMembers,
};

