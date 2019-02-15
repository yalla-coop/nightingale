const mongoose = require("mongoose");
const User = require("../../../database/models/User");

const defaultUser = {
  username: "tester-2009",
  name: "Test",
  password: "123456",
};
// load function to test
const updateUserParams = require("./../../../database/queries/updateUserParams");

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

  test("test it successfully stores params", async (done) => {
    // create test user
    await User.create(defaultUser);
    // get the id
    const testUser = await User.findOne({ username: "tester-2009" });
    const testUserID = testUser._id;
    // mock params
    const key = "faveSubj";
    const val = "History";
    // run function
    await updateUserParams(testUserID, key, val).catch(err => console.log(err));
    // test if correctly updated
    await User.findOne({ username: "tester-2009" }).then((user) => {
      expect(user[key]).toBeDefined();
      expect(user[key]).toEqual(val);
      done();
    });
  });
  test("test with invalid data", async (done) => {
    // create test user
    await User.create(defaultUser);
    // get the id
    const testUser = await User.findOne({ username: "tester-2009" });
    const testUserID = testUser._id;

    // mock params
    const key = "invalid";
    let val;
    // run function
    await updateUserParams(testUserID, key, val).catch(err => console.log(err));
    // test if correctly updated
    await User.findOne({ username: "tester-2009" }).then((user) => {
      expect(user[key]).toBeUndefined();
      done();
    });
  });
});
