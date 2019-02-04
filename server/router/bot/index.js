const bot = require("express").Router();

const messages = require("./messages");
const fulfillment = require("./fulfillment");

bot.post("/messages", messages);
bot.post("/fulfillment", fulfillment);

module.exports = bot;
