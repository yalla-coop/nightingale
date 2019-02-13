const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("./../../database/dummy_data");
const app = require("./../../app");

describe("Tesing for get-current-conversation API", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("test for current conversation API", (done) => {
    const data = {
      username: "nadia-2009",
      password: "123456",
    };

    request(app)
      .post("/api/user/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        const token = res.headers["set-cookie"][0].split(";")[0];

        request(app)
          .get("/api/user/current-conversation")
          .set("Cookie", [token])
          .expect(200)
          .end((error, conversations) => {
            expect(conversations).toBeDefined();
            expect(conversations.body).toBeDefined();
            expect(conversations.body.length).toBeGreaterThan(0);
            done();
          });
      });
  });
});
