const request = require("supertest");
const mongoose = require("mongoose");
const User = require("./../../database/models/User");

const buildDB = require("./../../database/dummy_data/index");
const app = require("./../../app");

describe("Tesing for register API schema", () => {
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

  test("test method", async (done) => {
    const user = await User.findOne();
    request(app)
      .get(`/api/user/${user.id}/conversations`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        done();
      });
  });
});
