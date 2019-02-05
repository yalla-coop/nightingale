const bot = require("express").Router();
const auth = require("./../../passport.js");

const messages = require("./messages");
const fulfillment = require("./fulfillment");
const chatBot = require("./chatBot");

bot.post("/messages", messages);
bot.post("/fulfillment", fulfillment);
bot.post("/chat", chatBot);

module.exports = bot;
