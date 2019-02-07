const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("./../../database/dummy_data");
const app = require("./../../app");

describe("Tesing for dashboard statistics API", () => {
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
          .get("/api/user/dashboard")
          .set("Cookie", [token])
          .expect(200)
          .end((dashboardError, dashboardResponse) => {
            expect(dashboardError).toBeFalsy();
            expect(dashboardResponse.body).toBeDefined();
            expect(dashboardResponse.body[0].moodsBystatus).toBeDefined();
            expect(dashboardResponse.body[0].moodsByDays).toBeDefined();
            done();
          });
      });
  });


  test("test with not a logged in user - without a cookie", (done) => {
    request(app)
      .get("/api/user/dashboard")
      .end((dummyAppError, dummyAppResponse) => {
        expect(dummyAppResponse.statusCode).toBe(401);
        done();
      });
  });
});
