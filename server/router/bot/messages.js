/* eslint-disable camelcase */
// Imports the Dialogflow client library
const dialogflow = require("dialogflow");

// load database requests
const storeUserMsg = require("../../database/queries/storeUserMsg");
const storeBotMsg = require("../../database/queries/storeBotMsg");
const checkConversation = require("../../database/queries/checkConversation");

module.exports = async (req, res) => {
  const private_key = process.env.private_key
    .replace(new RegExp("\\\\n", "g"), "\n")
    .replace("\"", "");
  // setup the configuration
  const config = {
    credentials: {
      type: process.env.type,
      project_id: process.env.project_id,
      private_key_id: process.env.private_key_id,
      private_key,
      client_email: process.env.client_email,
      client_id: process.env.client_id,
      auth_uri: process.env.auth_uri,
      token_uri: process.env.token_uri,
      auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
      client_x509_cert_url: process.env.client_x509_cert_url,
    },
  };

  // Instantiate a DialogFlow client.
  const sessionClient = new dialogflow.SessionsClient(config);

  const projectId = "nightingale-456a9";
  const sessionId = "123456";
  const languageCode = "BCP-47 language code, e.g. en-US";
  const query = req.body.message;
  // Define session path
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode,
      },
    },
    queryParams: {
      sentimentAnalysisRequestConfig: {
        analyzeQueryTextSentiment: true,
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);

  console.log("Detected intent");
  console.log(responses[0].queryResult.intent);

  // store the user's text
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);

  console.log("SESSION:", request.session);

  // this will be req.user.id once authentication all set up
  // currently using dummy Id from local database
  const dummyId = "5c587dcf87d23dc5b76530e6";

  // get conversation ID
  const conversationId = await checkConversation(dummyId).catch(err => console.log("conversationID error", err));

  storeUserMsg(result.queryText, conversationId)
    .then(msgResult => console.log("message stored", msgResult))
    .catch(err => console.log("message storage error", err));

  // store the bot's text
  console.log(`  Response: ${result.fulfillmentMessages}`);

  storeBotMsg(result.fulfillmentMessages, conversationId)
    .then(msgResult => console.log("bot message storred", msgResult))
    .catch(err => console.log("bot message storage error", err));

  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
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
  res.json(responses);
};
