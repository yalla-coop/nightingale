const request = require("supertest");
const mongoose = require("mongoose");

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

  test("test with valid request", (done) => {
    const data = {
      name: "name",
      username: "username",
      password: "password",
    };

    request(app)
      .post("/api/user/register")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.headers["set-cookie"][0]).toMatch("token");
        done();
      });
  });

  test("test with missing parameters", (done) => {
    const data = {
      name: "name",
      username: "username",
    };

    request(app)
      .post("/api/user/register")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        expect(err).toBeFalsy();
        expect(res.body.error).toMatch("\"password\" is required");
        done();
      });
  });

  test("test with in use usernname", (done) => {
    const data = {
      name: "name",
      username: "nadia-2009",
      password: "password",
    };

    request(app)
      .post("/api/user/register")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(409)
      .end((err, res) => {
        expect(res.body.error).toMatch("username already taken");
        done();
      });
  });

  test("test get method", (done) => {
    request(app)
      .get("/api/user/register")
      .expect("Content-Type", /json/)
      .expect(404)
      .end((err, res) => {
        expect(res.body.error).toBe("Not Found");
        done();
      });
  });
});
