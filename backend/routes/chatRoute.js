const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chatController');

router.post('/send', chatController.sendMessage);
router.get('/getMessages', chatController.getMessages);

module.exports = router;