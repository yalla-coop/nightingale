const User = require("./../models/User");
const Mood = require("./../models/Mood");
const WeeklyEvent = require("./../models/WeeklyEvent");
const NonSteadyEvent = require("./../models/NonSteadyEvent");
const Message = require("./../models/Message");
const Conversation = require("./../models/Conversation");
const SupportKeyword = require("./../models/SupportKeyword");
const Context = require("./../models/Context");
const EventIntent = require("./../models/EventIntent");

const resetDB = () => new Promise(async (resolve) => {
  await Message.deleteMany();
  await WeeklyEvent.deleteMany();
  await NonSteadyEvent.deleteMany();
  await Conversation.deleteMany();
  await Mood.deleteMany();
  await User.deleteMany();
  await SupportKeyword.deleteMany();
  await EventIntent.deleteMany();
  await Context.deleteMany();
  resolve();
});

module.exports = resetDB;
