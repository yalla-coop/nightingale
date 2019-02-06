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
      const result = responses[0].queryResult;
      const messageArr = result.fulfillmentMessages;
      // check if queryResult and intent are defined
      if (result && result.intent) {
        // check if fulfillmentMessages Array includes more than 1 message
        if (messageArr.length > 1) {
          // loop over it and send all individual responses to front
          // syntax: channel.trigger(eventName, data);
          messageArr.forEach((message) => {
            pusher.trigger("bot", "bot-response", {
              message: message.text.text,
            });
          });
        } else {
          // if there is only 1 single response then render it directly
          return pusher.trigger("bot", "bot-response", {
            message: result.fulfillmentText,
          });
        }
      } else {
        console.log("no intent matched");
      }
      return response.sendStatus(200);
    })
    .catch((err) => {
      console.error("ERROR:", err);
    });
};
module.exports = processMessage;
