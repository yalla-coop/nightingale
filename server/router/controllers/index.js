const express = require("express");

const router = express.Router();

const login = require("./login");
const register = require("./register");
const conversations = require("./conversations");


router.post("/user/register", register);
router.get("/user/:id/conversations", conversations.getConversations);
router.post("/user/login", login);

module.exports = router;
