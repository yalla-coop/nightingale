const mongoose = require("mongoose");
const User = require("../../../database/models/User");
// load function to test
const storeWeeklyEvents = require("../../../database/queries/storeWeeklyEvents");

const buildDB = require("../../../database/dummy_data/index");

describe("Testing the updateUserParams function", () => {
  beforeAll(async () => {
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await buildDB();
  });

  test("test it successfully creates a new entry", async (done) => {
    const testUser = await User.findOne({ username: "nadia-2009" });
    const id = testUser._id;

    const request = [
      { stringValue: "Monday", kind: "stringValue" },
      { stringValue: "Tuesday", kind: "stringValue" },
      { stringValue: "Wednesday", kind: "stringValue" },
    ];
    await storeWeeklyEvents(id, request, "favourite subject", testUser.faveSubj).then(res => console.log(res));

    done();
  });
});
