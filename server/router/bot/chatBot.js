// calls pusher function

// const processMessage = require("./process-message");
const Pusher = require("pusher");
const dialogflowResponse = require("./dialogflowSessionClient");

require("env2")("./.env");

module.exports = async (req, res) => {
  // setup pusher config
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    encrypted: true,
  });

  // start new dialogflow session
  // const sessionClient = new Dialogflow.SessionsClient(config);
  // const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // function to use websocket/pusher and dialogflow inserting user message coming from react

  // const request = {
  //   session: sessionPath,
  //   queryInput: {
  //     text: {
  //       text: message,
  //       languageCode,
  //     },
  //   },
  // };
  await dialogflowResponse(req.body.message)
    .then((responses) => {
      // console.log("response from dialogflow in process ", responses);
      const result = responses[0].queryResult;
      const messageArr = result.fulfillmentMessages;

      // console.log("ressss", result.parameters.fields);
      // check if queryResult and intent are defined
      if (result && result.intent) {
        // syntax: channel.trigger(eventName, data)
        // send over array of fullfilment messages
        pusher.trigger("bot", "bot-response", {
          message: messageArr,
        });
      }
      console.log("no intent matched");
      return res.sendStatus(200);
    })
    .catch((err) => {
      console.error("ERROR:", err);
    });
};
