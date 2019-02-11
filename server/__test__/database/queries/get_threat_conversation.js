const mongoose = require("mongoose");

const buildDB = require("../../../database/dummy_data/index");
const getThreatVConversation = require("../../../database/queries/get_threat_conversation");
const User = require("../../../database/models/User");

describe("Tesing for getThreatVConversation query", () => {
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
        getThreatVConversation(user.id)
          .then((data) => {
            expect(data).toBeDefined();
            expect(data[0].messages).toBeDefined();
            expect(data[0].messages.length).toBe(11);
            expect(data[0].userInfo).toBeDefined();
            expect(data[0].userInfo.name).toBe("Nadia");
            done();
          });
      });
  });
});
