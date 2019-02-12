const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("./../../database/dummy_data");
const app = require("./../../app");

describe("Tesing for logout API", () => {
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

  test("test with logged in user - with a cookie", (done) => {
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
          .get("/api/user/logout")
          .set("Cookie", [token])
          .expect(200)
          .end((logoutError, logoutResponse) => {
            const token2 = logoutResponse.headers["set-cookie"][0].split(";")[0];
            // the logout function should delete the token
            expect(token2).toBe("token=");
            done();
          });
      });
  });
});
