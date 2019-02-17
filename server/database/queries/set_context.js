const mongoos = require("mongoose");
const Context = require("./../models/Context");

module.exports = (userId, context) => Context.findOneAndUpdate(
  { user: userId }, // the condition
  { $set: { context, user: mongoos.Types.ObjectId(userId) } }, // the data to be stored
  { new: true, upsert: true }, // options - to create new document if didnt find documents
);
