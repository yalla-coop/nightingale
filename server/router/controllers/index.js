const express = require("express");

const router = express.Router();

const login = require("./login");
const register = require("./register");
const conversations = require("./conversations");
const dashboard = require("./dashboard");
const auth = require("./../../passport")();

router.post("/user/register", register);
router.get("/user/:id/conversations", conversations.getConversations);
router.post("/user/login", login);

// authenticated routes
router.get("/user/dashboard", auth.authenticate(), dashboard);


module.exports = router;
