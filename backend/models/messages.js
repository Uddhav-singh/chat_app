// const Sequelize = require('sequelize');
// const sequelize = require('../config/database');
// const User = require('./user');
// const Message = sequelize.define(
//     'message',
//     {
//         id: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             autoIncrement: true,
//             primaryKey: true
//         },
//         content: {
//             type: Sequelize.TEXT,
//             allowNull: false
//         },
//         senderId: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             references: {
//                 model: User,
//                 key: 'id'
//             }
//         },
//         receiverId: {
//             type: Sequelize.INTEGER,
//             allowNull: false,
//             references: {
//                 model: User,
//                 key: 'id'
//             }
//         }
//     },
//     {
//         tableName: "messages",
//         timestamps: true, // This is enabled by default
//     }
// );

// module.exports = Message;
// // This code defines a Sequelize model for messages in a chat application.


// const { DataTypes } = require("sequelize");
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
});

module.exports = Message;
