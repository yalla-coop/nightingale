/* eslint-disable camelcase */

// creates sessionClient, detects intend and sends response

// Imports the Dialogflow client library
const dialogflow = require("dialogflow");

// Import decideFlow function to decide the event trigger
const decideFlow = require("../../database/queries/decideFlow");

const getContext = require("./../../database/queries/get_context");
// Import userDetails to get userdetails
const getUserDetails = require("../../database/queries/getUserDetails");

module.exports = async (query, userId) => new Promise((resolve, reject) => {
  const private_key = process.env.private_key
    .replace(new RegExp("\\\\n", "g"), "\n")
    .replace("\"", "");

  // get the latest context for the user
  getContext(userId).then(async (data) => {
    const context = data && data.context;
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

    // get user details for message personalisation
    const name = await getUserDetails(userId);

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
        payload: {
          fields: {
            name: {
              stringValue: name.name,
              kind: "stringValue",
            },
          },
        },
        queryParams: {
          sentimentAnalysisRequestConfig: {
            analyzeQueryTextSentiment: true,
          },
          contexts: context,
          payload: {
            fields: {
              name: {
                stringValue: name.name,
                kind: "stringValue",
              },
            },
          },
        },
      };
    } else if (query.event) {
      console.log("EVENT REACHED")
      // decide which event should be sent in the query
      const event = await decideFlow(query.event, userId);
      request = {
        session: sessionPath,
        resetContexts: event.eventTitle === "start",
        queryInput: {
          event: {
            name: event.intent,
            languageCode,
          },
        },
        queryParams: {
          contexts: context,
          payload: {
            fields: {
              eventTitle: {
                stringValue: event.eventTitle,
                kind: "stringValue",
              },
              name: {
                stringValue: name.name,
                kind: "stringValue",
              },
            },
          },
        },
      };
    }

    console.log("REQUEST", request)
    // Send request and log result
    const responses = sessionClient.detectIntent(request);
    resolve(responses);
  });
});
