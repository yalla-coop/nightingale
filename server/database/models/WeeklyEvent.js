const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const weeklyEventSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  days: [String],
  eventEmotion: {
    type: Schema.Types.ObjectId,
    ref: "moods"
  },
  text: {
    type: string,
    required: true
  }
});

module.exports = mongoose.model("weeklyEvents", weeklyEventSchema);