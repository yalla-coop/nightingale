const request = require("supertest");

const app = require("./../../app");

describe("Tesing for bot - messages - API", () => {
  test("Test with valid message", (done) => {
    const data = {
      message: "Hi",
    };

    request(app)
      .post("/api/bot/messages")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body[0].queryResult).toBeDefined();
        done();
      });
  });
});
