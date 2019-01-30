const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = new Schema({
  conversation: {
    type: Schema.Types.ObjectId,
    ref: "conversations",
  },
  text: [String],
  sender: {
    type: String,
    enum: ["bot", "user"],
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("messages", messageSchema);
