const {
  WebhookClient, Suggestion, Card,
} = require("dialogflow-fulfillment");

const weekday = require("./weekdayFulfillment");
const general = require("./generalFulfillment");

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
    intentMap.set("Dont-Like-Lesson", weekday.dontlikeLesson);
    intentMap.set("Lesson-Classmates", weekday.classmates);
    intentMap.set("Usually-Like-Lesson", weekday.usuallyLikeLesson);
    intentMap.set("Negative-Pressure", weekday.pressure);
    intentMap.set("General-Other - yes", weekday.negativeFinish);
    intentMap.set("Extra-Thoughts", weekday.extraThoughts);

    // end of conversation fullfillments
    // // neutral
    intentMap.set("WeekdayNeutral - Yes", weekday.neutralFinish);
    intentMap.set("WeekdayNeutral - no", general.dontTalk);
    intentMap.set("General-Other - no", general.dontTalk);

    // // positive
    intentMap.set("DontWriteAboutChallenge", general.dontTalk);
    intentMap.set("WriteAboutChallenge", weekday.positiveFinish);
    intentMap.set("FunTime", weekday.funTime);
    intentMap.set("TryHard-No", weekday.tryHardNo);
    intentMap.set("TryHard-Yes", weekday.tryHardYes);
    intentMap.set("Other", general.positiveOther);
    intentMap.set("Lesson-DidWell", general.positiveGeneral);
    intentMap.set("Lesson-NiceTeacher", general.positiveGeneral);
    intentMap.set("Lesson-Interesting", general.positiveGeneral);
    intentMap.set("Lesson-FunFriends", general.positiveGeneral);
    intentMap.set("UsuallyEnjoy", general.positiveGeneral);

    // // negative
    intentMap.set("Talk-No", general.dontTalk);
    intentMap.set("Negative-Work - no", general.negativeDontTalk);
    intentMap.set("Negative-Work - yes", weekday.negativeFinish);
    intentMap.set("Lesson-Uninteresting", weekday.lessonUninteresting);
    intentMap.set("Lesson-Other - no", weekday.dontTalk);
    intentMap.set("Lesson-Other - yes", weekday.negativeFinish);
    intentMap.set("Lesson-Difficult", weekday.lessonDifficult);
    intentMap.set("Friends-Not-There", weekday.friendsNotThere);
    intentMap.set("LikeLesson-Other - no", general.dontTalk);
    intentMap.set("LikeLession-Other - yes", weekday.negativeFinish);
    intentMap.set("LikeLesson-Interesting", general.negativeGeneral);
    intentMap.set("LikeLesson-Difficult", general.negativeGeneral);
    intentMap.set("Friends-No", general.dontTalk);
    intentMap.set("Friends-Yes", weekday.negativeFinish);
    intentMap.set("Pressure-Exams - yes", weekday.negativeFinish);
    intentMap.set("Pressure-Exams - no", weekday.negativeDontTalk);
    intentMap.set("Friend-Issue - no", general.dontTalk);
    intentMap.set("FriendIssue - yes", weekday.negativeFinish);
    intentMap.set("Work-Issue - no", general.negativeDontTalk);
    intentMap.set("Work-Issue - yes", weekday.negativeFinish);
    intentMap.set("Bullied - Childline", general.bulliedChildline);
    intentMap.set("Bullied - Childline - no", general.bulliedChildlineNo);
    intentMap.set("Bullied-Talk-No", general.negativeDontTalk);
    intentMap.set("Bullied-Talk-Yes", weekday.negativeFinish);

    agent.handleRequest(intentMap);
  }
};
