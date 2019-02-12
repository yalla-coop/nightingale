const request = require("supertest");

const app = require("./../../app");

describe("Tesing for bot - startChat - API", () => {
  test("Test route with valid data", (done) => {
    const data = { event: "event" };
    request(app)
      .post("/api/bot/startchat")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        done();
      });
  });
  test("Test with no data", (done) => {
    request(app)
      .post("/api/bot/startchat")
      .send()
      .expect(500)
      .end((err, res) => {
        expect(res.error).toBeDefined();
        done();
      });
  });
});