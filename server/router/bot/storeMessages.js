// load database requests
const storeUserMsg = require("../../database/queries/storeUserMsg");
const storeBotMsg = require("../../database/queries/storeBotMsg");
const checkConversation = require("../../database/queries/checkConversation");

module.exports = async (message, messageArr) => {
  // this will be req.user.id once authentication all set up
  // currently using dummy Id from local database
  const dummyId = "5c5d271d34973405d0307df4";

  // get conversation ID
  const conversationId = await checkConversation(dummyId).catch(err => console.log("conversationID error", err));

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
};
