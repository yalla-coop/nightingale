const mongoose = require("mongoose");
const storeParams = require("../../../database/queries/storeParams");
const User = require("../../../database/models/User");
const WeeklyEvent = require("../../../database/models/WeeklyEvent");

const buildDB = require("../../../database/dummy_data/index");

const defaultUser = {
  username: "tester-2009",
  name: "Test",
  password: "123456",
};

const validDataArray = [
  {
    parameters: {
      fields: {
        birthDate: { stringValue: "1999-01-01T12:00:00+00:00" },
        faveSubj: { stringValue: "Geography" },
        faveSubjDays: {
          listValue: {
            values: [
              { stringValue: "Monday", kind: "stringValue" },
              { stringValue: "Tuesday", kind: "stringValue" },
            ],
          },
        },
        leastFaveSubj: { stringValue: "Music" },
        leastFaveSubjDays: {
          listValue: {
            values: [
              { stringValue: "Monday", kind: "stringValue" },
              { stringValue: "Thursday", kind: "stringValue" },
              { stringValue: "Friday", kind: "stringValue" },
            ],
          },
        },
      },
    },
  },
];

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

  test("test it successfully handles valid request and updates user", async (done) => {
    const testUser = await User.findOne({ username: "nadia-2009" });
    const testUserID = testUser._id;

    // run function
    await storeParams(validDataArray, validDataArray[0], testUserID);
    // test if correctly updated user
    await User.findOne({ username: "nadia-2009" }).then((user) => {
      expect(user).toBeDefined();
      expect(user.faveSubj).toEqual("Geography");
      expect(user.leastFaveSubj).toEqual("Music");
      done();
    });
  });

  test("test it successfully handles valid request and creates weekly event", async (done) => {
    // create test user (simulate registration)
    await User.create(defaultUser);
    // get the id
    const testUser = await User.findOne({ username: "tester-2009" });
    const testUserID = testUser._id;

    // run function
    await storeParams(validDataArray, validDataArray[0], testUserID);
    // check if user is defined
    await User.findOne({ username: "tester-2009" }).then(user => expect(user).toBeDefined());
    // check if the first and last event in collection is defined and created correctly based on input array
    await WeeklyEvent.find({ user: testUserID }).then((events) => {
      expect(events[0]).toBeDefined();
      expect(events.slice(-1)[0].user).toEqual(testUserID);
      expect(events).toHaveLength(2);
      expect(events.slice(-1)[0].days[0]).toEqual(1);
      expect(events.slice(-1)[0].text).toEqual("favourite subject: Geography");
      done();
    });
  });

  test("test it handles invalid request", async (done) => {
    const testUser = await User.findOne({ username: "nadia-2009" });
    const testUserID = testUser._id;

    // run function
    storeParams(["anything"], {}, testUserID).catch((err) => {
      expect(err).toBeDefined();
      done();
    });
  });
});
