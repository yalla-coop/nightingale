const express = require("express");

const router = express.Router();

const register = require("./register");
const conversations = require("./conversations");


router.post("/user/register", register);
router.get("/user/:user-id/conversations", conversations.getConversations);

module.exports = router;
