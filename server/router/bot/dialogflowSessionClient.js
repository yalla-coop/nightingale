/* eslint-disable camelcase */

// creates sessionClient, detects intend and sends response

// Imports the Dialogflow client library
const dialogflow = require("dialogflow");

// Import decideFlow function to decide the event trigger
const decideFlow = require("../../database/queries/decideFlow");

module.exports = (query, userId) => new Promise((resolve, reject) => {
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

  const projectId = config.credentials.project_id;
  const sessionId = userId;
  const languageCode = "BCP-47 language code, e.g. en-US";

  // Define session path
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // set up our request body
  let request = {};

  // check if the user has sent a message - if so then set this up in the request otherwise,
  // it'll be an event query to start a conversation
  if (query.message) {
    request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query.message,
          languageCode,
        },
      },
      queryParams: {
        sentimentAnalysisRequestConfig: {
          analyzeQueryTextSentiment: true,
        },
      },
    };
  } else if (query.event) {
    // decide which event should be sent in the query
    const event = decideFlow(query.event);
    request = {
      session: sessionPath,
      queryInput: {
        event: {
          name: event,
          languageCode,
        },
      },
    };
  }

  // Send request and log result
  const responses = sessionClient.detectIntent(request);

  resolve(responses);
});
