/* eslint-disable camelcase */
// Imports the Dialogflow client library

// load dialogflowClient
const Pusher = require("pusher");
const dialogflowResponse = require("./dialogflowSessionClient");

// load pusher

// load database requests
const storeUserMsg = require("../../database/queries/storeUserMsg");
const storeBotMsg = require("../../database/queries/storeBotMsg");
const checkConversation = require("../../database/queries/checkConversation");

module.exports = async (req, res) => {
  // setup pusher config
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    encrypted: true,
  });

  // store the user's text
  const responses = await dialogflowResponse(req.body.message);

  const result = responses[0].queryResult;
  const messageArr = result.fulfillmentMessages;

  // STORAGE ----------------------------------------------------------------------------
  // this will be req.user.id once authentication all set up
  // currently using dummy Id from local database
  const dummyId = "5c5d271d34973405d0307df4";

  // get conversation ID
  const conversationId = await checkConversation(dummyId).catch(err => console.log("conversationID error", err));

  // store the user's text
  storeUserMsg(result.queryText, conversationId)
    .then(msgResult => console.log("message stored", msgResult))
    .catch(err => console.log("message storage error", err));

  // store the bot's text
  storeBotMsg(result.fulfillmentMessages, conversationId)
    .then(msgResult => console.log("bot message storred", msgResult))
    .catch(err => console.log("bot message storage error", err));

  // RENDER-----------------------------------------------------------------------------

  if (result && result.intent) {
    // syntax: channel.trigger(eventName, data)
    // send over array of fullfilment messages
    await pusher.trigger("bot", "bot-response", {
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
