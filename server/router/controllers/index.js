const express = require("express");

const register = require("./register");

const router = express.Router();

router.post("/user/register", register);

module.exports = router;
