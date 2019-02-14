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

    const request = [
      { stringValue: "Monday", kind: "stringValue" },
      { stringValue: "Tuesday", kind: "stringValue" },
      { stringValue: "Wednesday", kind: "stringValue" },
    ];
    await storeWeeklyEvents(id, request, "favourite subject", testUser.faveSubj, 0).then((event) => {
      expect(event).toBeDefined();
      expect(event.user).toEqual(id);
      expect(event.days[0]).toEqual(1);
      expect(event.text).toEqual("favourite subject: Maths");
      expect(event.eventEmotion).toEqual(moods[0]._id);
    });
    done();
  });
});
