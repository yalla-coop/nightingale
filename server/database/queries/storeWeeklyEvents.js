// stores weekly events (currently only favourite and least favourite subject)
// takes in the user_id, array of days (objects of stringValues), description of the event(hard coded) the value (e.g. Maths, History ..) and a moodScore (hard coded for now)

const WeeklyEvent = require("../models/WeeklyEvent");
const Mood = require("../models/Mood");

const makeDaysArray = require("./makeDaysArray");

module.exports = (id, inputDaysArray, description, value, moodScore) => new Promise(async (resolve, reject) => {
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
