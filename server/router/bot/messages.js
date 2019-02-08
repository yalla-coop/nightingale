/* eslint-disable camelcase */

// Import dialogflowClient and pusherClient
const pusher = require("./pusherSessionClient");
const dialogflowResponse = require("./dialogflowSessionClient");

// load storeMessages controller
const storeMessages = require("./storeMessages");

module.exports = async (req, res) => {
  // create responses object
  await dialogflowResponse(req.body.message)
    .then(async (responses) => {
      // grab the important stuff
      const result = responses[0].queryResult;
      const messageArr = result.fulfillmentMessages;

      // STORAGE ------------------------------------
      storeMessages(result.queryText, messageArr).catch(err => console.log(err));

      // don't run pusher in test currently as it somehow crashes travis
      if (!process.env.NODE_ENV === "test") {
        // RENDER---------------------------------------
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
          console.log(
            `  Magnitude: ${result.sentimentAnalysisResult.queryTextSentiment.magnitude}`,
          );
        } else {
          console.log("No sentiment Analysis Found");
        }
      }
      return res.sendStatus(200);
    })
    .catch(err => res.sendStatus(500));
};
