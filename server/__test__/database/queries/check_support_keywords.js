const mongoose = require("mongoose");

const buildDB = require("../../../database/dummy_data/index");
const checkSupportKeywords = require("../../../database/queries/check_support_keywords");

describe("Tesing for checkSupportKeywords query", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });


  test("check with matched words", (done) => {
    const message = "I am depressed";

    checkSupportKeywords(message)
      .then((data) => {
        expect(data).toBeDefined();
        expect(data[0].category).toBe("depression");
        done();
      });
  });

  test("check with un-matched words", (done) => {
    const message = "I am Happy";

    checkSupportKeywords(message)
      .then((data) => {
        expect(data.length).toBe(0);
        done();
      });
  });
});
