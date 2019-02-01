const express = require("express");

const controllers = express.Router();

controllers.use("/controllerstest", (req, res) => {
  console.log("reached");
  res.status(200).send("control reached");
});

module.exports = controllers;
