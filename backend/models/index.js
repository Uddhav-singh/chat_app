
const User = require('./user');
const Group = require('./groupModel');
const GroupMember = require('./groupMember');
const Message = require('./messages');

// Associations

// Group belongs to creator
Group.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

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
Message.belongsTo(Group, { foreignKey: 'groupId' });

module.exports = {
  User,
  Group,
  GroupMember,
  Message
};
// This file serves as the entry point for the models in the application.
// It imports the necessary models and sets up their associations.