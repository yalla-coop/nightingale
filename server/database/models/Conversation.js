const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  time: {
    type: Date,
    default: Date.now
  },
  mood: {
    type: Schema.Types.ObjectId,
    ref: "moods"
  },
  completed: Boolean
});

module.exports = mongoose.models("conversations", conversationSchema);