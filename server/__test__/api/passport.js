const request = require("supertest");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const express = require("express");

const buildDB = require("./../../database/dummy_data");

const app = require("./../../app");
const auth = require("./../../passport")();

// build a dummy app
const dummyApp = express();
dummyApp.use(express.json());
dummyApp.use(express.urlencoded({ extended: false }));
dummyApp.use(cookieParser());
dummyApp.use(auth.initialize());

//  create authenticated route
dummyApp.use("/check-passport", auth.authenticate(), (req, res) => {
  res.json(req.user);
});

describe("Tesing for Passport strategy", () => {
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


  test("test to authenticated route with cookie", (done) => {
    const data = {
      username: "nadia-2009",
      password: "123456",
    };

    // login using real app
    request(app)
      .post("/api/user/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(err).toBeFalsy();
        // Get the token from response
        const token = res.headers["set-cookie"][0].split(";")[0];

        // request to dummyApp
        request(dummyApp)
          .post("/check-passport")
          .expect("Content-Type", /json/)
          .expect(200)
          // send the cookie in the new request
          .set("Cookie", [token])
          .end((dummyAppError, dummyAppResponse) => {
            expect(dummyAppError).toBeFalsy();
            expect(dummyAppResponse.body.name).toBe("Nadia");
            expect(dummyAppResponse.body.username).toBe("nadia-2009");
            done();
          });
      });
  });


  test("test to authenticated route without cookie", (done) => {
    const data = {
      username: "nadia-2009",
      password: "123456",
    };

    request(dummyApp)
      .post("/check-passport")
      .send(data)
      .end((dummyAppError, dummyAppResponse) => {
        expect(dummyAppResponse.statusCode).toBe(401);
        done();
      });
  });
});
