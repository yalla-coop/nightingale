const bot = require("express").Router();

const messages = require("./messages");
const fulfillment = require("./fulfillment");

bot.post("/messages", messages);
bot.post("/fulfillment", fulfillment);

bot.get("/bottest", (req, res) => {
  console.log("reached");
  res.status(200).send("bot reached");
});

bot.post("/posttest", (req, res) => {
  console.log("reached", req.body);
  res.status(200).send("posted");
});
module.exports = bot;
