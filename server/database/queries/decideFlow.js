const moment = require("moment");
const getWeeklyEvents = require("./getWeeklyEvents");

const decideFlow = async (event, userId) => {
  // check if weekend or weekday

  const weekday = moment().weekday() > 0 && moment().weekday() < 6;

  if (event === "start") {
    return "start";
  }
  if (!weekday) {
    return "weekend";
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
    .forEach(weeklyEvent => flowOptions.push(weeklyEvent.text.split(":")[0]));

  // pick one of the flow options at random
  const random = Math.floor(Math.random() * flowOptions.length);
  return flowOptions[random];
};

module.exports = decideFlow;
