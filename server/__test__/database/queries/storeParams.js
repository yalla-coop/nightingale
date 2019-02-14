const mongoose = require("mongoose");
const storeParams = require("../../../database/queries/storeParams");
const User = require("../../../database/models/User");

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

  test("test it successfully handles valid request", async (done) => {
    const testUser = await User.findOne({ username: "nadia-2009" });
    const testUserID = testUser._id;

    const dataArray = [
      {
        parameters: {
          fields: {
            faveSubj: {
              stringValue: "Geography",
            },
            leastFaveSubj: {
              stringValue: "Music",
            },
          },
        },
      },
    ];
    // run function
    await storeParams(dataArray, dataArray[0], testUserID);
    // test if correctly updated
    await User.findOne({ username: "nadia-2009" }).then((user) => {
      expect(user).toBeDefined();
      expect(user.faveSubj).toEqual("Geography");
      expect(user.leastFaveSubj).toEqual("Music");
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
