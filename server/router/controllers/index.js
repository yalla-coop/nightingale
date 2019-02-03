const express = require("express");

const login = require("./login");

const router = express.Router();

router.post("/user/login", login);

module.exports = router;
