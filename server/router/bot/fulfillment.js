const { WebhookClient, Suggestion, Payload } = require("dialogflow-fulfillment");

const welcomeFulfillment = (agent) => {
  agent.add(new Suggestion("Monday"));
  agent.add(new Suggestion("Tuesday"));
  agent.add("this is another message also");
  console.log("welcome reached");
};

const multiChoice = (agent) => {
  console.log("multi reached");
  const options = ["Monday", "Tuesday"];
  options.map(option => agent.add(new Suggestion(option)));
  const payload = new Payload("multi", {
    text: "anything",
    quick_replies: options.map(option => ({
      content_type: "text",
      title: option,
      payload: option,
    })),
  });

  agent.add(payload);

  // const suggestion = new Suggestion({
  //   title: "Send",
  //   reply: "The answer",
  // });
  // agent.add(suggestion);
  // console.log("multiChoice suggestion", suggestion);
  console.log("multiChoice agent", agent);
};

module.exports = (req, res) => {
  console.log("reached");
  const agent = new WebhookClient({ request: req, response: res });
  const intentMap = new Map();
  intentMap.set("TestFulfillment", multiChoice);
  agent.handleRequest(intentMap);
};
