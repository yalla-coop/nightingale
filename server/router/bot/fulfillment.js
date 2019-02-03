const {
  WebhookClient, Suggestion, Payload, Card,
} = require("dialogflow-fulfillment");

const welcomeFulfillment = (agent) => {
  agent.add(new Suggestion("Monday"));
  agent.add(new Suggestion("Tuesday"));
  agent.add("this is another message also");
  console.log("welcome reached");
};

const quickReply = (agent) => {
  console.log("quick reached");
  agent.add(new Suggestion("Suggestion to go here"));

  agent.add(new Suggestion("Suggestion 2 to go here"));

  agent.add(new Suggestion("Suggestion 3 to go here"));
};

const cardReply = (agent) => {
  console.log("card reached");
  const card = new Card({
    title: "card title",
    text: "card text",
    imageUrl: "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
    buttons: [
      {
        postback: "hello",
        text: "one",
      },
      {
        postback: "hello",
        text: "two",
      },
      {
        postback: "hello",
        text: "three",
      },
      {
        postback: "hello",
        text: "four",
      },
      {
        postback: "hello",
        text: "five",
      },
      {
        postback: "hello",
        text: "six",
      },
    ],
  });
  agent.add(card);
};

const multiChoice = (agent) => {
  console.log("multi reached");
  const options = ["Monday", "Tuesday"];

  const payload = new Payload("multi", {
    text: "anything",
    quick_replies: options.map(option => ({
      content_type: "text",
      title: option,
      payload: option,
      sendAsMessage: true,
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
  intentMap.set("CardTemplate", cardReply);
  intentMap.set("QuickTemplate", quickReply);
  agent.handleRequest(intentMap);
};
