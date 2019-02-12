const mongoose = require("mongoose");

const { Schema } = mongoose;

const supportKeywordSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  text: [String],
});

supportKeywordSchema.index({ text: "text" }, { weights: { text: 1 } });

module.exports = mongoose.model("supportkeywords", supportKeywordSchema);
