const { WebhookClient, Suggestion } = require("dialogflow-fulfillment");

const welcomeFulfillment = (agent) => {
  agent.add(new Suggestion("Send"));
  Suggestion.setReply("the actual answer");
  console.log("reached", agent);
};

module.exports = (req, res) => {
  console.log("reached");
  const agent = new WebhookClient({ request: req, response: res });
  const intentMap = new Map();
  intentMap.set("TestFulfillment", welcomeFulfillment);
  agent.handleRequest(intentMap);
};
