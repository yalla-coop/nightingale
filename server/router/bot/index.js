const bot = require("express").Router();
const auth = require("./../../passport.js")();

const messages = require("./messages");
const fulfillment = require("./fulfillment");
const startChat = require("./startChat")
// const chatBot = require("./chatBot");

bot.post("/messages", auth.authenticate(), messages);
bot.post("/fulfillment", fulfillment);
bot.post("/startchat", startChat)
// bot.post("/chat", chatBot);

module.exports = bot;
