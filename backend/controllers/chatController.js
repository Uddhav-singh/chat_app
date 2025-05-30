const Message = require("../models/messages");

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
    try{
    const messages = await Message.findAll({
        order: [['createdAt', 'ASC']],
    });
    res.json(messages);
    } catch (err) {
    console.error("Error fetching messages:", err);
};
}

module.exports = {
  sendMessage,
  getMessages,
};
