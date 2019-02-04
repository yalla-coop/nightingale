const mongoose = require("mongoose");

// load model
const User = require("./../../../database/models/User");

// load function to test
const checkConversation = require("./../../../database/queries/checkConversation");

const buildDB = require("./../../../database/dummy_data/index");

describe("Testing the checkConversation function", () => {
  beforeAll(async () => {
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await buildDB();
  });

  test("test when there is no conversation stored", (done) => {
    const user = User.findOne({ username: "nadia-2009" });

    checkConversation(user.id).then((conversationId) => {
      expect(conversationId).toBeDefined();
      expect(typeof conversationId).toBe("string");
      done();
    });
  });
});
