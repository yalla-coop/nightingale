const mongoose = require("mongoose");

// load function to test
const storeUserMsg = require("./../../../database/queries/storeUserMsg");

const buildDB = require("./../../../database/dummy_data/index");

describe("Testing the storeUserMsg function", () => {
  beforeAll(async () => {
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await buildDB();
  });

  test("test it successfully stores message", (done) => {
    const message = "this is a test message";
    const conversationId = "5c586a12ed1d9bbf06a70340";

    storeUserMsg(message, conversationId).then((msgResult) => {
      expect(msgResult).toBeDefined();
      expect(msgResult.text[0]).toBe("this is a test message");
      expect(msgResult.conversation.toString()).toBe("5c586a12ed1d9bbf06a70340");
      expect(msgResult.sender).toBe("user");
      done();
    });
  });
});
