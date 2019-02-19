/* eslint-disable camelcase */

// Import dialogflowClient and pusherClient
const pusher = require("./pusherSessionClient");
const dialogflowResponse = require("./dialogflowSessionClient");

const supportKeywordsChecker = require("./support_keywords");

const checkUserInfo = require("./../../database/queries/check_user_info");

// load storeMessages controller
const storeMessages = require("./storeMessages");

const setContext = require("./../../database/queries/set_context");

// load storeParams controller
const storeParams = require("../../database/queries/storeParams");

module.exports = async (req, res) => {
  // get user info
  const { id } = req.user;
  // create responses object
  await dialogflowResponse(req.body, id)
    .then(async (responses) => {
      // grab the important stuff
      const result = responses[0].queryResult;
      const messageArr = result.fulfillmentMessages;
      const paramArr = result.outputContexts;

      let completedInfo = await checkUserInfo(id);

      if (!completedInfo) {
        // updates key information for user (subjects, birthday ..)
        // creates new weekly events
        storeParams(paramArr, paramArr[0], id)
          .then(resu => console.log(resu))
          .catch(err => console.log(err));
      } else {
        // STORAGE ------------------------------------
        storeMessages(result.queryText, messageArr, id)
          .then(storedMsg => console.log("stored messages: ", storedMsg))
          .catch(err => console.log(err));
      }

      if (!responses[0].queryResult.intent.displayName.includes("Fallback")
       && !responses[0].queryResult.intent.displayName.includes("fallback") && completedInfo) {
        await setContext(id, responses[0].queryResult.outputContexts);
      }

      // store the context from the response
      // check for support keywords
      supportKeywordsChecker(req.body.message, id)
        .then(async (needImmediateSupport) => {
          // RENDER---------------------------------------
          // check if result comes back defined and includes intent
          if (result && result.intent) {
            completedInfo = await checkUserInfo(id);
            // send over array of fullfilment messages via pusher
            pusher(`bot_${id}`, "bot-response", {
              message: messageArr,
              needImmediateSupport,
              completedInfo,
            }).catch(err => console.log(err));
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
          return res.sendStatus(200);
        })

        .catch(() => res.sendStatus(500));
    })
    .catch(() => res.sendStatus(500));
};
