const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const nonSteadySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  dates: [Date],
  eventEmotion: {
    type: Schema.Types.ObjectId,
    ref: "moods"
  },
  text: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("nonSteadyEvents", nonSteadySchema);