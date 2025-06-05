const Sequelize = require('sequelize');
const sequelize = require('../config/databse');

const Group = sequelize.define('Group', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdBy: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'groups',
  timestamps: true
});

module.exports = Group;
