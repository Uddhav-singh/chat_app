
const User = require('./user');
const Group = require('./groupModel');
const GroupMember = require('./groupMember');
const Message = require('./messages');

// Associations



Group.belongsToMany(User, {
  through: GroupMember,
  foreignKey: 'groupId',
  otherKey: 'userId',
  as: 'users' // <- use this alias
});

User.belongsToMany(Group, {
  through: GroupMember,
  foreignKey: 'userId',
  otherKey: 'groupId',
  as: 'groups' // <- optional, but makes the User.groups call easier
});

// For messages
//Message.belongsTo(User, { foreignKey: 'user', targetKey: 'email' }); // only if 'user' stores email
Message.belongsTo(Group, { foreignKey: 'groupId' });

// ✅ Add this association (for eager loading to work in getGroupMembers)
GroupMember.belongsTo(User, {
  foreignKey: 'userId',
});
User.hasMany(GroupMember, {
  foreignKey: 'userId',
});

// Group belongs to creator
Group.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });


module.exports = {
  User,
  Group,
  GroupMember,
  Message
};
// This file serves as the entry point for the models in the application.
// It imports the necessary models and sets up their associations.