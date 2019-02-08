const request = require("supertest");

const app = require("./../../app");

describe("Tesing for bot - messages - API", () => {
  test("Test with valid message", (done) => {
    const data = { message: "hi" };
    request(app)
      .post("/api/bot/messages")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.text).toEqual("OK");
        done();
      });
  });
  test("Test with invalid message", (done) => {
    const data = "anything";
    request(app)
      .post("/api/bot/messages")
      .send(data)
      .expect(500)
      .end((err, res) => {
        expect(res.error).toBeDefined();
        done();
      });
  });
  test("Test with no data", (done) => {
    request(app)
      .post("/api/bot/messages")
      .send()
      .expect(500)
      .end((err, res) => {
        expect(res.error).toBeDefined();
        done();
      });
  });
});
