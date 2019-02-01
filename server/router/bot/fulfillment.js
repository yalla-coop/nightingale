const { WebhookClient } = require("dialogflow-fulfillment");

const welcomeFulfillment = (agent) => {
  agent.add("Hey!");
  agent.add("whats your name?");
};

module.exports = (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });
  const intentMap = new Map();
  intentMap.set("TestFulFillment", welcomeFulfillment);
  agent.handleRequest(intentMap);
};
