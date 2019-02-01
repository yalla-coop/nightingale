const { WebhookClient, Suggestion } = require("dialogflow-fulfillment");

const welcomeFulfillment = (agent) => {
  agent.add(new Suggestion("Monday"));
  agent.add(new Suggestion("Tuesday"));
  agent.add("this is another message also");
  console.log("reached", agent);
};

module.exports = (req, res) => {
  console.log("reached");
  const agent = new WebhookClient({ request: req, response: res });
  const intentMap = new Map();
  intentMap.set("TestFulfillment", welcomeFulfillment);
  agent.handleRequest(intentMap);
};
