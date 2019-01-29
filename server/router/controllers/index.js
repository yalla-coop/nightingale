const controllers = require("express").Router();

controllers.get("/test", (req, res) => {
  res.status(200).send("Hey there");
});

module.exports = controllers;
