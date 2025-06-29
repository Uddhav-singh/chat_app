// const Message = require("../models/messages");
// const { all } = require("../routes/chatRoute");
// const { Op } = require("sequelize"); //Op stands for Sequelize Operators. It provides special symbols like 
// // Op.gt → Greater than
// // Op.lt → Less than




// const sendMessage = async (req, res) => {
//   try {
//     const { user, content } = req.body;

//     if (!user || !content) {
//       return res.status(400).json({ error: "User and content are required." });
//     }

//     const newMessage = await Message.create({ user, content });

//     res.status(201).json({
//       message: "Message saved successfully.",
//       data: newMessage,
//     });
//   } catch (err) {
//     console.error("Error saving message:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// const getMessages = async (req, res) => {
//   // older code to fetch all the messages 
// //     try{
// //     const messages = await Message.findAll({
// //         order: [['createdAt', 'ASC']],
// //     });
// //     res.json(messages);
// //     } catch (err) {
// //     console.error("Error fetching messages:", err);
// // };
 

// try {
//     const { after } = req.query;

//     const whereClause = after
//       ? { createdAt: { [Op.gt]: new Date(after) } }
//       : {};

//     const messages = await Message.findAll({
//       where: whereClause,
//       order: [['createdAt', 'ASC']],
//     });

//     res.json(messages);
//   } catch (err) {
//     console.error("Error fetching messages:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }

// }

// module.exports = {
//   sendMessage,
//   getMessages,
// };


// ======= Above code is for normal messages send and get =======

// below is for sending messages in group and getting messgaes by group 

const Message = require('../models/messages');
const User = require('../models/user');
const Group = require('../models/groupModel');

const sendMessage = async (req, res) => {
  try {
    const { content, groupId } = req.body;
    const user = req.user;

    if (!content || !groupId) {
      return res.status(400).json({ error: "Content and groupId are required." });
    }

    const newMessage = await Message.create({
      content,
      groupId,
      user: user.email, // or user.name
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Failed to send message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

const getMessagesByGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId;

    if (!groupId) {
      return res.status(400).json({ error: "Group ID is required." });
    }

    const messages = await Message.findAll({
      where: { groupId },
      order: [['timestamp', 'ASC']],
    });

    res.json(messages);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

module.exports = {
  sendMessage,
  getMessagesByGroup,
};
