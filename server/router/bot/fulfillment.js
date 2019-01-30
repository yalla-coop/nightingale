const { WebhookClient } = require("dialogflow-fulfillment");

welcomeFulfillment = (agent) => {
  agent.add("Hey!");
  agent.add("whats your name?");
};

module.exports = (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });
  const intentMap = new Map();
  intentMap.set("UserOnboarding", welcomeFulfillment);
  agent.handleRequest(intentMap);
};
