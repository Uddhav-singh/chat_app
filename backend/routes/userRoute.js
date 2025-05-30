const express = require('express');
const {getAllUsers} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to verify JWT

const router = express.Router();

router.get('/users', authMiddleware, getAllUsers); //protected route

module.exports = router;
