const mongoose = require("mongoose");
const loginQuery = require("./../../../database/queries/login");
const buildDB = require("./../../../database/dummy_data/index");

describe("Tesing for login query", () => {
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

  test("login with valid data", (done) => {
    const username = "nadia-2009";

    loginQuery(username)
      .then((user) => {
        expect(user).toBeDefined();
        expect(user.name).toBe("Nadia");
        expect(user.username).toBe(username);
        done();
      });
  });

  test("test with not exist username", (done) => {
    const username = "Wrong_username";
    loginQuery(username)
      .then((user) => {
        expect(user).toBeNull();
        done();
      });
  });
});
