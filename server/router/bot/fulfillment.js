const {
  WebhookClient, Suggestion, Payload, Card,
} = require("dialogflow-fulfillment");

const welcomeFulfillment = (agent) => {
  agent.add(new Suggestion("Monday"));
  agent.add(new Suggestion("Tuesday"));
  agent.add("this is another message also");
  console.log("welcome reached");
};

const hello = (phrase) => {
  console.log("hello", phrase);
};

const quickReply = (agent) => {
  console.log("quick reached");
  agent.add(new Suggestion("Suggestion to go here"));

  agent.add(new Suggestion("Suggestion 2 to go here"));

  agent.add(new Suggestion("Suggestion 3 to go here"));
};

const cardReply = (agent) => {
  console.log("card response", agent);

  const card = new Card({
    title: "card title",
    text: "card text",
    imageUrl: "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
  });
  card.setButton({
    text: "one",
    url: `${hello("hello")}`,
  });

  agent.add(card);
};

const multiCards = (agent) => {
  console.log("multi cards reached");
  const card1 = new Card({
    title: "card title",
    text: "card text",
  });
  card1.setButton({ text: "button 1", url: "anything" });

  const card2 = new Card({
    title: "card 2",
    text: "card",
  });
  card2.setButton({ text: "button 1", url: "anything" });

  const card3 = new Card({
    title: "card title",
    text: "card text",
  });
  card3.setButton({ text: "button 1", url: "anything" });

  const card4 = new Card({
    title: "card title",
    text: "card text",
  });
  card4.setButton({ text: "button 1", url: "anything" });

  agent.add(card1);
  agent.add(card2);
  agent.add(card3);
  agent.add(card4);
};

const customAction = (req, res) => {
  console.log("custom reached");
  return res.json({
    fulfillmentMessages: [
      {
        card: {
          title: "card",
          buttons: [
            {
              text: "good",
              postback: "anything",
            },
            {
              text: "bad",
              postback: "anything",
            },
          ],
        },
      },
    ],
    source: "TestFulfillment",
  });
};

module.exports = (req, res) => {
  console.log("reached", req.body);
  const agent = new WebhookClient({ request: req, response: res });
  const intentMap = new Map();
  if (req.body.queryResult.intent.displayName === "TestFulfillment") {
    customAction(req, res);
  } else {
    intentMap.set("CardTemplate", cardReply);
    intentMap.set("QuickTemplate", quickReply);
    intentMap.set("MultiCardsTemplate", multiCards);
    agent.handleRequest(intentMap);
  }
};
