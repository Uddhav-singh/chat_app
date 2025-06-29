// const express = require('express');
// const router = express.Router();

// const chatController = require('../controllers/chatController');

// router.post('/send', chatController.sendMessage);
// router.get('/getMessages', chatController.getMessages);

// module.exports = router;

// ======= Above code is for normal messages send and get =======

// below is for sending messages in group and getting messgaes by group 

const express = require('express');
const router = express.Router();
const messageController = require('../controllers/chatController');
const authenticate = require('../middleware/authMiddleware');

router.post('/send', authenticate, messageController.sendMessage);
router.get('/getMessages/:groupId', authenticate, messageController.getMessagesByGroup);

module.exports = router;
// This code defines a route for sending and fetching messages in a group chat application.
// It uses Express.js to create a router that handles POST requests to send messages and GET requests to fetch messages by group ID.    
