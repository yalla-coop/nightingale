const bot = require("express").Router();
const auth = require("./../../passport.js")();

const messages = require("./messages");
const fulfillment = require("./fulfillment");
const startChat = require("./startChat");
const getUserInfo = require("./getUserInfo");
// const chatBot = require("./chatBot");

bot.post("/messages", auth.authenticate(), messages);
bot.post("/fulfillment", fulfillment);
bot.post("/startchat", auth.authenticate(), startChat);
bot.get("/info", auth.authenticate(), getUserInfo);
// bot.post("/chat", chatBot);

module.exports = bot;
