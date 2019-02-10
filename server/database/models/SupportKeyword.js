const mongoose = require("mongoose");

const { Schema } = mongoose;

const supportKeywordSchema = new Schema({
  category: {
    type: String,
    required: false,
  },
  text: [String],
});

supportKeywordSchema.index({ text: "text" });

module.exports = mongoose.model("supportkeywords", supportKeywordSchema);
