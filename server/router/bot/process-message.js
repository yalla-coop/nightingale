// handles message request to be rendered
const Dialogflow = require("dialogflow");
const Pusher = require("pusher");
require("env2")("./.env");

// setup dialogflow config
const projectId = "nightingale-456a9";
const sessionId = "123456";
const languageCode = "en-US";

const private_key = process.env.private_key
  .replace(new RegExp("\\\\n", "g"), "\n")
  .replace("\"", "");

const config = {
  credentials: {
    private_key,
    client_email: process.env.client_email,
  },
};

// setup pusher config
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: true,
});

// start new dialogflow session
const sessionClient = new Dialogflow.SessionsClient(config);
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// function to use websocket/pusher and dialogflow inserting user message coming from react
const processMessage = (message, response) => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode,
      },
    },
  };

  sessionClient
    .detectIntent(request)
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
      return response.sendStatus(200);
    })
    .catch((err) => {
      console.error("ERROR:", err);
    });
};
module.exports = processMessage;
