const express = require("express");

const router = express.Router();

const login = require("./login");
const register = require("./register");
const conversations = require("./conversations");
const messages = require("./messages");
const dashboard = require("./dashboard");
const auth = require("./../../passport")();

router.post("/user/register", register);
router.get("/user/:id/conversations", conversations);
router.post("/user/login", login);
router.get("/user/:id/conversations/:conversationId", messages);

// authenticated routes
router.get("/user/dashboard", auth.authenticate(), dashboard);


module.exports = router;
