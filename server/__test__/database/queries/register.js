const mongoose = require("mongoose");
const registerQuery = require("./../../../database/queries/register");
const buildDB = require("./../../../database/dummy_data/index");

// const Message = require("./../../../database/models/Message");
// const Conversation = require("./../../../database/models/Conversation");

describe("Tesing for register query", () => {
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

  test("register with valid data", (done) => {
    const data = {
      name: "Name",
      username: "username",
      password: "password",
    };
    registerQuery(data)
      .then((newUser) => {
        expect(newUser).toBeDefined();
        expect(newUser.name).toBe(data.name);
        expect(newUser.username).toBe(data.username);
        expect(newUser.password).not.toBe(data.password);
        done();
      });
  });

  test("register should check for duplicated usrname", (done) => {
    const data = {
      name: "Name",
      username: "nadia-2009",
      password: "password",
    };
    registerQuery(data)
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.message).toEqual("username already taken");
        done();
      });
  });

  test("test for wrong data shape", (done) => {
    const data = {};
    registerQuery(data)
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err.message).toMatch("validation failed");
        done();
      });
  });
});
