const express = require("express");
const loginUser = require("../controllers/logIn");

const router = express.Router();

router.post("/login", loginUser);

module.exports = router;
