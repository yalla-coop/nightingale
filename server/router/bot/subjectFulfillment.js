// bespoke fulfillment requests for the weekday flow

const { Suggestion, Card, Text } = require("dialogflow-fulfillment");

const updateMood = require("../../database/queries/update_mood");
const weeklyEvents = require("../../database/queries/getWeeklyEvents");

const storeInDB = (agent) => {
  const { session } = agent;
  const userId = session.split("/")[session.split("/").length - 1];
  let mood = agent.query;
  switch (mood) {
  case "Amazing":
    updateMood(userId, (mood = 0));
    break;
  case "Good":
    updateMood(userId, (mood = 1));
    break;
  case "It was OK":
    updateMood(mood === 2, userId);
    break;
  case "Not great":
    updateMood(mood === 3, userId);
    break;
  default:
    updateMood(mood === 4, userId);
    break;
  }
};

const getWeeklyEvent = async (agent, eventType) => {
  const { session } = agent;
  const userId = session.split("/")[session.split("/").length - 1];
  console.log("user", userId);
  console.log("sesh", session);

  const events = await weeklyEvents(userId);
  console.log("EVENTS", events);
  console.log("ASYNC", await weeklyEvents(userId));
  console.log("TYPE", typeof events);
  if (events.length > 0) {
    console.log("EVENTS REACHED");
    const filteredEvent = events.filter(event => event.text.split(":")[0] === eventType);
    console.log("FILTERED", filteredEvent);
    const eventTitle = filteredEvent[0].split(":")[1];
    return eventTitle;
  }
  return "lesson";
};

exports.favourite = async (agent) => {
  const subject = await getWeeklyEvent(agent, "faveSubj");
  agent.add(new Text("Hi! 👋"));
  agent.add(new Text(`How was ${subject} today?`));
  agent.add(new Suggestion("Amazing"));
  agent.add(new Suggestion("Good"));
  agent.add(new Suggestion("It was OK"));
  agent.add(new Suggestion("Not great"));
  agent.add(new Suggestion("Terrible"));
};
