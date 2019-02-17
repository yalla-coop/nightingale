const mongoose = require("mongoose");

const { Schema } = mongoose;

const contextSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  context: [Object],
});

module.exports = mongoose.model("contexts", contextSchema);
