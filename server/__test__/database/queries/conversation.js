const mongoose = require("mongoose");
const buildDB = require("./../../../database/dummy_data/index");

const User = require("./../../../database/models/User");
const conversationQuery = require("../../../database/queries/conversation");

describe("Tesing conversation query", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // build dummy data
    await buildDB();
  });

  test("get conversations for dummy user", async () => {
    const user = await User.findOne();
    const userID = user._id;
    await conversationQuery(userID).then((conversations) => {
      expect(conversations).toBeDefined();
      expect(conversations.length).toEqual(7);
    });
  });
});
