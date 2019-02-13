const mongoose = require("mongoose");

const buildDB = require("../../../database/dummy_data/index");
const getCurrentConversation = require("../../../database/queries/get_current_conversation");
const User = require("../../../database/models/User");

describe("Tesing for getCurrentConversation query", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("check for incoming results", (done) => {
    User.findOne()
      .then((user) => {
        getCurrentConversation(user.id)
          .then((data) => {
            expect(data).toBeDefined();
            done();
          });
      });
  });
});
