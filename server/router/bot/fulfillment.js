const { WebhookClient } = require("dialogflow-fulfillment");

const welcomeFulfillment = (agent) => {
  console.log("reached", agent);
  agent.add("this message sent by webhooks for Welcome intent");
  agent.add("this is another message also");
};

module.exports = (req, res) => {
  console.log("reached");
  const agent = new WebhookClient({ request: req, response: res });
  console.log("agent", agent);
  const intentMap = new Map();
  intentMap.set("TestFulfillment", welcomeFulfillment);
  console.log("intent", intentMap);
  agent.handleRequest(intentMap);
};
