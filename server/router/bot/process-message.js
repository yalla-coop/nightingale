// handles message request to be rendered
const Dialogflow = require("dialogflow");
const Pusher = require("pusher");

const projectId = process.env.project_id;
const sessionId = "123456";
const languageCode = "en-US";

const config = {
  credentials: {
    private_key: process.env.private_key,
    client_email: process.env.client_email,
  },
};

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: true,
});

const sessionClient = new Dialogflow.SessionsClient(config);
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const processMessage = (message) => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode,
      },
    },
  };
};

sessionClient
  .detectIntent(request)
  .then((responses) => {
    const result = responses[0].queryResult;
    return pusher.trigger("bot", "bot-response", {
      message: result.fulfillmentText,
    });
  })
  .catch(err => console.error(err));

module.exports = processMessage;
