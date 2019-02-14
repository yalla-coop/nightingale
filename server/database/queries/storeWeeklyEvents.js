// stores birthday, favourite subject and least favourite subject for user
const WeeklyEvent = require("../models/WeeklyEvent");
const User = require("../models/User");
const Mood = require("../models/Mood");

const makeDaysArray = require("./makeDaysArray");

module.exports = (id, inputDaysArray, description, value, moodScore) => new Promise(async (resolve, reject) => {
  // create new weekly event
  const moods = await Mood.find();

  const newWeeklyEvent = new WeeklyEvent({
    user: id,
    days: makeDaysArray(inputDaysArray),
    text: `${[description]}: ${value}`,
    eventEmotion: moods[moodScore]._id,
  });
  newWeeklyEvent
    .save()
    .then(resolve)
    .catch(reject);
});
