// load database requests
const storeUserMsg = require("../../database/queries/storeUserMsg");
const storeBotMsg = require("../../database/queries/storeBotMsg");
const checkConversation = require("../../database/queries/checkConversation");

module.exports = async (message, messageArr, userId) => new Promise(async (resolve, reject) => {
  // get conversation ID
  const conversationId = await checkConversation(userId).catch(reject);

  // store the user's text
  await storeUserMsg(message, conversationId)
    .then(async () => {
      // store the bot's text
      // check if text response is defined (we dont want to store quick reply options just the answers)
      if (messageArr[0].text) {
        await storeBotMsg(messageArr, conversationId)
          .then(resolve)
          .catch(reject);
      } else {
        resolve();
      }
    })
    .catch(reject);
});
