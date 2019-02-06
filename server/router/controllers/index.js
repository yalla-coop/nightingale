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

// authentication middleware
router.use(auth.authenticate());


// authenticated routes
router.post("/user/dashboard", dashboard);


module.exports = router;
