const mongoose = require("mongoose");
const dashboardQuery = require("../../../database/queries/dashboard_statistics");
const buildDB = require("../../../database/dummy_data/index");
const User = require("../../../database/models/User");

describe("Tesing for dashboard statistics query", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("test dashboard statistics with valid data", (done) => {
    User.findOne()
      .then((user) => {
        dashboardQuery(user.id)
          .then((data) => {
            expect(data).toBeDefined();
            expect(data[0].moodsBystatus).toBeDefined();
            expect(data[0].moodsByDays).toBeDefined();
            done();
          });
      });
  });
});
