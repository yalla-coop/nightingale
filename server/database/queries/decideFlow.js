const moment = require("moment");
const getWeeklyEvents = require("./getWeeklyEvents");

const decideFlow = async (event, userId) => {
  // check if weekend or weekday

  const weekday = moment().weekday() > 0 && moment().weekday() < 6;

  if (event === "start") {
    return { intent: "start", eventTitle: "" };
  }
  if (event === "moreThoughts") {
    return { intent: "moreThoughts", eventTitle: "" };
  }
  if (!weekday) {
    return { intent: "weekend", eventTitle: "" };
  }

  // WEEKDAY OPTIONS --------------------------------
  // set up our object to populate with flow options
  const flowOptions = ["weekday"];

  // get any weekly events for the user
  const weeklyEvents = await getWeeklyEvents(userId);

  // map through to search for either fave and/or least fave subjects
  // and if they have that subject today
  // if any match then add to our flowOptions array
  weeklyEvents
    .filter(
      weeklyEvent => (weeklyEvent.text.split(":")[0] === "faveSubj"
          || weeklyEvent.text.split(":")[0] === "leastFaveSubj")
        && weeklyEvent.days.includes(moment().weekday()),
    )
    .forEach(weeklyEvent => flowOptions.push(weeklyEvent.text));

  // pick one of the flow options at random
  const random = Math.floor(Math.random() * flowOptions.length);

  // set up an object which has the event to trigger the title
  // and information about that weeklyevent
  const intent = flowOptions[random].split(":")[0];
  const eventTitle = flowOptions[random].split(":")[1];

  return { intent, eventTitle };
};

module.exports = decideFlow;
