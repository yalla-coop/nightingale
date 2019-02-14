// stores birthday, favourite subject and least favourite subject for user
const WeeklyEvent = require("../models/WeeklyEvent");
const User = require("../models/User");

const makeDaysArray = require("./makeDaysArray");

module.exports = async (id, inputArray, event, value) => {
  // create new weekly event

  const newWeeklyEvent = new WeeklyEvent({
    user: id,
    days: makeDaysArray(inputArray),
    text: `${[event]}: ${value}`,
  });
  await newWeeklyEvent.save().catch(err => console.log(err));
  return newWeeklyEvent;
};
