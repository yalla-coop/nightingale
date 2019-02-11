/* eslint-disable camelcase */

// Import dialogflowClient and pusherClient
const pusher = require("./pusherSessionClient");
const dialogflowResponse = require("./dialogflowSessionClient");

const supportKeywordsChecker = require("./support_keywords");

// load storeMessages controller
const storeMessages = require("./storeMessages");

module.exports = (req, res) => {
  // get user info

  const { id } = req.user;

  // check for support keywords
  supportKeywordsChecker(req.body.message, id)
    .then(async (needImmediateSupport) => {
      // create responses object
      await dialogflowResponse(req.body.message)
        .then((responses) => {
          // grab the important stuff
          const result = responses[0].queryResult;
          const messageArr = result.fulfillmentMessages;

          // STORAGE ------------------------------------
          storeMessages(result.queryText, messageArr).catch(err => console.log(err));

          // RENDER---------------------------------------
          // check if result comes back defined and includes intent
          if (result && result.intent) {
            // send over array of fullfilment messages via pusher
            pusher("bot", "bot-response", {
              message: messageArr,
              needImmediateSupport,
            }).catch(err => console.log(err));
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
        })
        .catch(err => res.sendStatus(500));
    }).catch(() => {
      res.sendStatus(500);
    });
};
