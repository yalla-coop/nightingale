// load database requests
const storeUserMsg = require("../../database/queries/storeUserMsg");
const storeBotMsg = require("../../database/queries/storeBotMsg");
const checkConversation = require("../../database/queries/checkConversation");
const updateRquickReply = require("./../../database/queries/update_quick_reply.js");

module.exports = (message, messageArr, userId) => new Promise(async (resolve, reject) => {
  // get conversation ID
  const conversationId = await checkConversation(userId).catch(reject);
  const storageArray = [];
  // store the user's text
  // check if the user has sent anything (if empty string it means that this is an event starting the conversation)
  if (message.length > 0) {
    const userMsg = await storeUserMsg(message, conversationId);
    storageArray.push(userMsg);
  }

  // store the bot's text
  // check if text response is defined (we dont want to store quick reply options just the answers)
  if (messageArr[0].text) {
    const botMsg = await storeBotMsg(messageArr, conversationId);
    // store the last quick reply from the bot
    await updateRquickReply(messageArr, conversationId);
    storageArray.push(botMsg);
  }

  resolve(storageArray);
});
