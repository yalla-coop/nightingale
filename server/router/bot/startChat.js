/* eslint-disable camelcase */

const pusher = require("./pusherSessionClient");
const dialogflowResponse = require("./dialogflowSessionClient");

// load storeMessages controller
const storeMessages = require("./storeMessages");

module.exports = async (req, res) => {
  const { id } = req.user;
  await dialogflowResponse(req.body)
    .then((responses) => {
      // grab the important stuff

      const result = responses[0].queryResult;
      const messageArr = result.fulfillmentMessages;

      // STORAGE -------------------------------

      storeMessages("", messageArr, id)
        .then(storedMsg => console.log("stored messages: ", storedMsg))
        .catch(err => console.log(err));

      // RENDER----------------------------------
      // check if result comes back defined and includes intent
      if (result && result.intent) {
        // send over array of fulfillment messages via pusher
        pusher("bot", "bot-response", {
          message: messageArr,
        }).catch(err => console.log(err));
      } else {
        console.log("No intent matched");
      }

      return res.sendStatus(200);
    })
    .catch(err => res.sendStatus(500));
};
