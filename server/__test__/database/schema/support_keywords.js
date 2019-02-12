const mongoose = require("mongoose");
const SupportKeyword = require("../../../database/models/SupportKeyword");
const buildDB = require("../../../database/dummy_data/index");

describe("Tesing for SupportKeyword schema", () => {
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

  test("SupportKeyword should be defined", () => {
    expect(SupportKeyword).toBeDefined();
  });

  test("supportKeywords should contain 4 collections", async () => {
    const supportKeywords = await SupportKeyword.find();
    expect(supportKeywords.length).toBe(4);
  });
});
