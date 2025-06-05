const User = require('./user');
const Group = require('./groupModel');
const GroupMember = require('./groupMember');
const Message = require('./messages');

// Associations
Group.belongsTo(User, { foreignKey: 'createdBy' });
GroupMember.belongsTo(User, { foreignKey: 'userId' });
GroupMember.belongsTo(Group, { foreignKey: 'groupId' });

Message.belongsTo(Group, { foreignKey: 'groupId' });

module.exports = {
  User,
  Group,
  GroupMember,
  Message
};
