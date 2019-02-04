// Imports the Dialogflow client library
const dialogflow = require("dialogflow");

// load database requests
const storeUserMsg = require("../../database/queries/storeUserMsg");
const storeBotMsg = require("../../database/queries/storeBotMsg");
const checkConversation = require("../../database/queries/checkConversation");

module.exports = async (req, res) => {
  private_key = process.env.private_key.replace(new RegExp("\\\\n", "g"), "\n").replace("\"", "");
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

  // const config = {
  //   credentials: {
  //     type: "service_account",
  //     project_id: "nightingalebot-b49a4",
  //     private_key_id: "c5338f99b47e009f61758817deefa4c73d19dccd",
  //     private_key:
  //       "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDnM3RZzZUwvlxB\n7qhsgQRRSlUwBwcOADydrVcjdx6w+OxgC+Sk3DI7DeP3k2ZQls/Jwr/OSXhkMPRp\nlVeSzRCbf9M9IE63Slqd51QDboeaTQHqoB7Q4fwt5WNGvmNfvm4UPB6UNi5UTFbh\nD8W33t0WZoNx5ApU8jyGfVx728hqwD1Gxic9n0BgIuOP1sxl21ziERt2s4FwWgnz\nTGXczxa59UDb7vfdnK46l7JgMJkAcUhZ97PvvOgE+FJqa+xQGO+NYVzx5VtIhIIo\nquxIKPhACBZQniOVByOO60VhavpanYb58RuEQaGXwo9iBBEm6Rm+4Nx8LpQx9Iq2\nCgy/w0slAgMBAAECggEAMaWJ8ZLE25+0/e96uToHLFGS82o+6JHCcnV7hcEZlRUO\n5R0IryIdozK7Zjl/ugR4gDHSsEB0mscsZNPN51cjntCXEsQyQwezZ775+naspcSt\nia1ykJZGabCdXd6aRkAFMVErm9X6ot11toSFh5NS1HGU/krisRUHTDX1Ox+Z7NoM\nfJfwgQIynb3vFeFAy2SfJCu+YSFJcmbTqqQM7u87z6KomZNxzynSdxkc4aDrXRpD\n/zWqa8ry6A7RwxCnT3vw0saJkevAdxmvrNQPSwsXzpKEf22IyHuveVu+o6hK1U7i\ng1oLHAFLJiKgxrq0pQsZ/TzxA9SR6PIqi/jG3vwpIQKBgQD9UwxHjicRDKmOqDyI\nY+iSn1zJy1qBgOfTIt0ZG2jAYUpm1zQ4kmdDBMLvkWYxzvR7HiLrQwb19jMu+as/\nn8Sfn765KS2WoWDbutYLs5jXedlYodUaHHO/6pmOH9ZrJ/3EpU0tAn8F8fVDzLHq\niaueUahyqPZ6Rzr7d0TVWS4z7QKBgQDppJaLm7ORERE6frU6/csWgJLWe6zsAPon\nN1PSONsp4+juycWnnc1IaaDO6M6kRx+JC7RNPcavxSNxcejHUVUEHSlWOmL94k+2\nZCipg8QMJtxxt/1CVddClplsnJvPABhQLbz420nMuAPZ65dlin1wzAhLQBlYX/tU\nKKT3hMv9GQKBgQDe34EPN17hni1TSGqxaI0G6tRc6d9/zqSnWqYBX98CWtZ1smLM\nXuogyYCj+11Y9wabh0EbkQX/whL4AksLGAqKkaXgC/2C6ApqZ2/ILcOL2DVDyGXP\nqjagI8vjgdlIv4+BwhkrP2X4Gg86Dk591Y+7I4a7EjKAFEktUpqpxeNjZQKBgQCS\nXelxzDjRyD9ixb4DFrsDfch/VTsfHf2YU7DPIY8qzvw9m2mXd+QCWSnEdVP+1g+L\naymoueqecoGhsBqDww/fY+Vhf3JEWmJVgKl4iHNoqW+wTfL6e4w+ytmSkQmKxCR3\nFjAsNjQla6H+Avj1Q60R3L/VZHJ8SqTINC4kYazpAQKBgAI7SeNK4GNjaUlogADa\nu6czyYxXdMOxzvZ7PNgLz9MVeastUPMUn9IBihoNkjJrFAlUtoeog0l/IjqozL3m\n1N9qMyIvbPj2Z2vvwt4bAZJa59CTz4J22Bw4quhXMNsVcbwLgGORoIDEVXr+PbAU\nfWbZnt4TyySUPD88P0Q+sNwl\n-----END PRIVATE KEY-----\n",
  //     client_email: "nightingale-dialogflow@nightingalebot-b49a4.iam.gserviceaccount.com",
  //     client_id: "113266178445083394764",
  //     auth_uri: "https://accounts.google.com/o/oauth2/auth",
  //     token_uri: "https://oauth2.googleapis.com/token",
  //     auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  //     client_x509_cert_url:
  //       "https://www.googleapis.com/robot/v1/metadata/x509/nightingale-dialogflow%40nightingalebot-b49a4.iam.gserviceaccount.com",
  //   },
  // };

  // Instantiate a DialogFlow client.
  const sessionClient = new dialogflow.SessionsClient(config);

  const projectId = "nightingale-456a9";
  const sessionId = "12345";
  const languageCode = "BCP-47 language code, e.g. en-US";
  const query = req.body.message;
  console.log("BODY", req.body.message);
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
