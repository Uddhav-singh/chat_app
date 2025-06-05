const Sequelize = require('sequelize');
const sequelize = require('../config/databse');

const Message = sequelize.define("Message", {
  user: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  timestamp: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
   groupId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
},{
  tableName: "messages",
  timestamps: true, // Automatically adds createdAt and updatedAt fields
}
);

module.exports = Message;
