const Message = require("../models/messages");
const { all } = require("../routes/chatRoute");
const { Op } = require("sequelize"); //Op stands for Sequelize Operators. It provides special symbols like 
// Op.gt → Greater than
// Op.lt → Less than




const sendMessage = async (req, res) => {
  try {
    const { user, content } = req.body;

    if (!user || !content) {
      return res.status(400).json({ error: "User and content are required." });
    }

    const newMessage = await Message.create({ user, content });

    res.status(201).json({
      message: "Message saved successfully.",
      data: newMessage,
    });
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  // older code to fetch all the messages 
//     try{
//     const messages = await Message.findAll({
//         order: [['createdAt', 'ASC']],
//     });
//     res.json(messages);
//     } catch (err) {
//     console.error("Error fetching messages:", err);
// };
 

try {
    const { after } = req.query;

    const whereClause = after
      ? { createdAt: { [Op.gt]: new Date(after) } }
      : {};

    const messages = await Message.findAll({
      where: whereClause,
      order: [['createdAt', 'ASC']],
    });

    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Internal server error" });
  }

}

module.exports = {
  sendMessage,
  getMessages,
};
