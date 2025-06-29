const Sequelize = require('sequelize');
const sequelize = require('../config/databse');

const GroupUser = sequelize.define('GroupUser', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  groupId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
},
 {
  tableName: 'group_users',
  timestamps: true
});

module.exports = GroupUser;
