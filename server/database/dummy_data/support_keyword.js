const SupportKeyword = require("../models/SupportKeyword");

const buildSupportKeyword = () => {
  const keywords = [{
    category: "suicide",
    text: [
      "I feel like i need to suicide",
      "I feel suicidal",
      "I want to kill myself",
      "I'm suicidal",
    ],
  }, {
    category: "bullying",
    text: [
      "I being bullied",
      "pick on me",
    ],
  }, {
    category: "abuse",
    text: [
      "I was assaulted",
      "I have been violated",
    ],
  }, {
    category: "depression",
    text: [
      "I'm depressed",
      "I feel like getting depressed",
    ],
  }];
  return SupportKeyword.insertMany(keywords);
};

module.exports = buildSupportKeyword;
