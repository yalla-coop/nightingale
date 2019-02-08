/* eslint-disable camelcase */

// Import dialogflowClient and pusherClient
const pusher = require("./pusherSessionClient");
const dialogflowResponse = require("./dialogflowSessionClient");

// load database requests
const storeUserMsg = require("../../database/queries/storeUserMsg");
const storeBotMsg = require("../../database/queries/storeBotMsg");
const checkConversation = require("../../database/queries/checkConversation");

module.exports = async (req, res) => {
  // create responses object
  const responses = await dialogflowResponse(req.body.message).catch(err => console.log(err));
  // grab the important stuff
  const result = responses[0].queryResult;
  const messageArr = result.fulfillmentMessages;

  // STORAGE ----------------------------------------------------------------------------

  // this will be req.user.id once authentication all set up
  // currently using dummy Id from local database
  const dummyId = "5c5d271d34973405d0307df4";

  // get conversation ID
  const conversationId = await checkConversation(dummyId).catch(err => console.log("conversationID error", err));

  // store the user's text
  await storeUserMsg(result.queryText, conversationId)
    .then(msgResult => console.log("message stored", msgResult))
    .catch(err => console.log("message storage error", err));

  // store the bot's text
  await storeBotMsg(result.fulfillmentMessages, conversationId)
    .then(msgResult => console.log("bot message storred", msgResult))
    .catch(err => console.log("bot message storage error", err));

  // RENDER-----------------------------------------------------------------------------
  // check if result comes back defined and includes intent
  if (result && result.intent) {
    // send over array of fullfilment messages via pusher
    await pusher("bot", "bot-response", {
      message: messageArr,
    });
  } else {
    console.log("  No intent matched.");
  }
  if (result.sentimentAnalysisResult) {
    console.log("Detected sentiment");
    console.log(`  Score: ${result.sentimentAnalysisResult.queryTextSentiment.score}`);
    console.log(`  Magnitude: ${result.sentimentAnalysisResult.queryTextSentiment.magnitude}`);
  } else {
    console.log("No sentiment Analysis Found");
  }
  return res.sendStatus(200);
};
