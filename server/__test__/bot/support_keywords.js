const supportKeywords = require("./../../router/bot/support_keywords");
const User = require("./../../database/models/User");

describe("Testing the supportKeywords function", () => {
  test("test supportKeywords", async () => {
    User.findOne().then((user) => {
      const userMessage = "Hi";
      supportKeywords(userMessage, user.id).then((needSupport) => {
        expect(needSupport).toBeFalsy();
      });
    });
  });
  test("test supportKeywords", async () => {
    User.findOne().then((user) => {
      const userMessage = "I feel depressed";
      supportKeywords(userMessage, user.id).then((needSupport) => {
        expect(needSupport).toBeTruthy();
      });
    });
  });
});
