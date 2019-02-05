const mongoose = require("mongoose");

// load function to test
const storeBotMsg = require("./../../../database/queries/storeBotMsg");

const buildDB = require("./../../../database/dummy_data/index");

describe("Testing the storeBotMsg function", () => {
  beforeAll(async () => {
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await buildDB();
  });

  test("test it successfully stores messages", (done) => {
    const messages = [
      {
        platform: "PLATFORM_UNSPECIFIED",
        text: {
          text: ["Hi, Nadia"],
        },
        message: "text",
      },
      {
        platform: "PLATFORM_UNSPECIFIED",
        text: {
          text: ["My name’s Nightingale"],
        },
        message: "text",
      },
    ];
    const conversationId = "5c586a12ed1d9bbf06a70340";

    storeBotMsg(messages, conversationId).then((msgResult) => {
      expect(msgResult).toBeDefined();
      expect(msgResult.text[0]).toBe("Hi, Nadia");
      expect(msgResult.conversation.toString()).toBe("5c586a12ed1d9bbf06a70340");
      expect(msgResult.sender).toBe("bot");
      done();
    });
  });

  test("test it successfully filters out messages that aren't text", (done) => {
    const messages = [
      {
        platform: "PLATFORM_UNSPECIFIED",
        card: {
          buttons: [
            {
              text: "good",
              postback: "anything",
            },
            {
              text: "bad",
              postback: "anything",
            },
          ],
          title: "card",
          subtitle: "",
          imageUri: "",
        },
        message: "card",
      },
      {
        platform: "PLATFORM_UNSPECIFIED",
        text: {
          text: ["My name’s Nightingale"],
        },
        message: "text",
      },
    ];
    const conversationId = "5c586a12ed1d9bbf06a70340";

    storeBotMsg(messages, conversationId).then((msgResult) => {
      expect(msgResult).toBeDefined();
      expect(msgResult.text[0]).toBe("My name’s Nightingale");
      expect(msgResult.conversation.toString()).toBe("5c586a12ed1d9bbf06a70340");
      expect(msgResult.sender).toBe("bot");
      done();
    });
  });
});
