const express = require("express");

const controllers = express.Router();

const login = require("./login");
const register = require("./register");

const router = express.Router();

router.post("/user/register", register);
router.post("/user/login", login);

module.exports = router;
