const express = require("express");

const controllers = express.Router();

controllers.use("/controllerstest", (req, res) => {
  console.log("reached");
  res.status(200).send("control reached");
});


const login = require("./login");
const register = require("./register");

const router = express.Router();

router.post("/user/register", register);
router.post("/user/login", login);

module.exports = router;
