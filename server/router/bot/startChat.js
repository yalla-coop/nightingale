/* eslint-disable camelcase */

const pusher = require("./pusherSessionClient");
const dialogflowResponse = require("./dialogflowSessionClient");
const checkUserInfo = require("./../../database/queries/check_user_info");
// load storeMessages controller
const storeMessages = require("./storeMessages");

module.exports = async (req, res) => {
  const { id } = req.user;
  await dialogflowResponse(req.body, id)
    .then(async (responses) => {
      // grab the important stuff

      const result = responses[0].queryResult;
      const messageArr = result.fulfillmentMessages;

      const initialConversationIntents = [
        "Welcome",
        "Birthday",
        "Fave-Subject",
        "Least-Fave-Subject",
        "AddThoughtsNow",
        "Least-Fave-Subject - yes",
      ];
      const intent = result.intent.displayName;
      const completedInfo = await checkUserInfo(id);

      console.log("initial", intent)

      if (!initialConversationIntents.includes(intent) && completedInfo) {
        // STORAGE -------------------------------

        storeMessages("", messageArr, id)
          .then(storedMsg => console.log("stored messages: ", storedMsg))
          .catch(err => console.log(err));
      }

      // RENDER----------------------------------
      // check if result comes back defined and includes intent
      if (result && result.intent) {
        console.log("intent", result.intent)
        // send over array of fulfillment messages via pusher
        pusher(`bot_${id}`, "bot-response", {
          message: messageArr,
        }).catch(err => console.log(err));
      } else {
        console.log("No intent matched");
      }

      return res.sendStatus(200);
    })
    .catch(err => res.sendStatus(500));
};
