const {
  WebhookClient, Suggestion, Payload, Card,
} = require("dialogflow-fulfillment");

const weekday = require("./weekdayFulfillment");

const hello = (phrase) => {
  console.log("hello", phrase);
};

// template function to put in quick reply suggestions for the user to select
const quickReply = (agent) => {
  console.log("quick reached");
  agent.add(new Suggestion("Suggestion to go here"));

  agent.add(new Suggestion("Suggestion 2 to go here"));

  agent.add(new Suggestion("Suggestion 3 to go here"));
};

// template function to put in a card.
// NOTE: this package only let's you put in one button per card
const cardReply = (agent) => {
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

// template function to load multiple cards
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

// template function for a custom action rather than using the fulfillment package
// this is useful if we want to do something very bespoke e.g. multiple buttons per card
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
  const agent = new WebhookClient({ request: req, response: res });
  const intentMap = new Map();
  if (req.body.queryResult.intent.displayName === "TestFulfillment") {
    customAction(req, res);
  } else {
    intentMap.set("CardTemplate", cardReply);
    intentMap.set("QuickTemplate", quickReply);
    intentMap.set("MultiCardsTemplate", multiCards);
    intentMap.set("WeekdayStart", weekday.mood);
    intentMap.set("WeekdayPositive", weekday.positive);
    intentMap.set("DontUsuallyEnjoy", weekday.dontUsuallyEnjoyLesson);
    intentMap.set("Talk-Yes", weekday.negative);
    intentMap.set("TalkFriends-Fallback", weekday.finish);
    intentMap.set("Dont-Like-Lesson", weekday.dontlikeLesson);
    intentMap.set("Lesson-Classmates", weekday.classmates);
    intentMap.set("TalkLesson-Other-Fallback", weekday.finish);
    intentMap.set("Usually-Like-Lesson", weekday.usuallyLikeLesson);
    intentMap.set("LikeLesson-Other - Fallback", weekday.finish);
    intentMap.set("Negative-Work-Talk - Fallback", weekday.finish);
    intentMap.set("Negative-Pressure", weekday.pressure);
    intentMap.set("Talk-Exams - fallback", weekday.finish);
    intentMap.set("Bullied-Talk-Yes - fallback", weekday.finish);
    intentMap.set("Work-Issue-Talk - Fallback", weekday.finish);
    intentMap.set("Friend-Issue-Talk - fallback", weekday.finish);
    intentMap.set("General-Other-Talk - fallback", weekday.newFinish);
    agent.handleRequest(intentMap);
  }
};
