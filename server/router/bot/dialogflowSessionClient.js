/* eslint-disable camelcase */

// creates sessionClient, detects intend and sends response
// Imports the Dialogflow client library
const dialogflow = require("dialogflow");

module.exports = query => new Promise((resolve, reject) => {
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
  // const query = req.body.message;
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
  const responses = sessionClient.detectIntent(request);

  // console.log("response from dialogflow in store msg", responses);

  resolve(responses);
});
