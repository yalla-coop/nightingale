const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("./../../database/dummy_data");
const app = require("./../../app");

describe("Tesing for login API", () => {
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

  test("test with valid username and password", (done) => {
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
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body.id).toBeDefined();
        expect(res.body.username).toBe("nadia-2009");
        expect(res.body.name).toBe("Nadia");
        expect(res.headers["set-cookie"][0]).toMatch("token");
        done();
      });
  });

  test("test with wrong username", (done) => {
    const data = {
      username: "wrong_username",
      password: "123456",
    };

    request(app)
      .post("/api/user/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(403)
      .end((err, res) => {
        expect(err).toBeFalsy();
        expect(res.body.error).toMatch("Incorrect username or password.");
        done();
      });
  });

  test("test with wrong password", (done) => {
    const data = {
      username: "nadia-2009",
      password: "Wrong_password",
    };

    request(app)
      .post("/api/user/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(403)
      .end((err, res) => {
        expect(err).toBeFalsy();
        expect(res.body.error).toMatch("Incorrect username or password.");
        done();
      });
  });
});
