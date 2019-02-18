const mongoose = require("mongoose");
const Conversation = require("./../../../database/models/Conversation");
const buildDB = require("./../../../database/dummy_data/index");

describe("Tesing for Conversation schema", () => {
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

  test("Conversation should be defined", () => {
    expect(Conversation).toBeDefined();
  });

  test("Conversation should contain 8 collections", async () => {
    const conversations = await Conversation.find();
    expect(conversations.length).toBe(7);
  });
});
