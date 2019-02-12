// load database requests
const storeUserMsg = require("../../database/queries/storeUserMsg");
const storeBotMsg = require("../../database/queries/storeBotMsg");
const checkConversation = require("../../database/queries/checkConversation");

module.exports = async (message, messageArr, userId) => new Promise(async (resolve, reject) => {
  // get conversation ID
  const conversationId = await checkConversation(userId).catch(reject);

  // store the user's text
  // check if the user has sent anything (if empty string it means that this is an event starting the conversation)
  if (message.length > 0) {
    await storeUserMsg(message, conversationId)
      .then(msgResult => console.log("message stored", msgResult))
      .catch(err => console.log("message storage error", err));
  }

  // store the bot's text
  // check if text response is defined (we dont want to store quick reply options just the answers)
  if (messageArr[0].text) {
    await storeBotMsg(messageArr, conversationId)
      .then(msgResult => console.log("bot message storred", msgResult))
      .catch(err => console.log("bot message storage error", err));
  }
});
