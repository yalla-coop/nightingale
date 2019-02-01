const controllers = require("express").Router;

controllers.get("/test", (req, res) => {
  res.status(200).send("Hi");
});
module.exports = controllers;
