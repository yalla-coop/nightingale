const mongoose = require("mongoose");
const User = require("../../../database/models/User");
const Mood = require("../../../database/models/Mood");
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
    const moods = await Mood.find();

    const inputArray = [
      { stringValue: "Monday", kind: "stringValue" },
      { stringValue: "Tuesday", kind: "stringValue" },
      { stringValue: "Wednesday", kind: "stringValue" },
    ];
    await storeWeeklyEvents(id, inputArray, "favourite subject", testUser.faveSubj, 0).then(
      (event) => {
        expect(event).toBeDefined();
        expect(event.user).toEqual(id);
        expect(event.days[0]).toEqual(1);
        expect(event.text).toEqual("favourite subject: Maths");
        expect(event.eventEmotion.toJSON()).toEqual(moods[0].toJSON());
      },
    );
    done();
  });

  test("test with invalid user request", async (done) => {
    const id = "invalid";
    const inputArray = [];
    await storeWeeklyEvents(id, inputArray, "favourite subject", "anything", 0).catch((error) => {
      expect(error).toBeDefined();
    });
    done();
  });
  test("test with invalid text request", async (done) => {
    const testUser = await User.findOne({ username: "nadia-2009" });
    const id = testUser._id;
    const inputArray = [];
    let text;
    await storeWeeklyEvents(id, inputArray, "favourite subject", text, 0).catch((error) => {
      expect(error).toBeDefined();
    });
    done();
  });
});
