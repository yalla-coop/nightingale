const request = require("supertest");

const app = require("./../../app");

describe("Tesing for bot - Fulfillment - API", () => {
  test("Test with CardTemplate Intent", (done) => {
    const mockedReuest = {
      responseId: "ce43f3ab-0b32-4851-b470-98924449b8b8",
      queryResult: {
        queryText: "card", parameters: {}, allRequiredParamsPresent: true, fulfillmentMessages: [{ text: { text: [""] } }], intent: { name: "projects/nightingale-456a9/agent/intents/020af1b7-77b4-40b1-9c3d-6a54a1d35d5f", displayName: "CardTemplate" }, intentDetectionConfidence: 1, languageCode: "en",
      },
      originalDetectIntentRequest: { payload: {} },
      session: "projects/nightingale-456a9/agent/sessions/27925210-5b79-99f1-4e57-186f9ef702d3",
    };

    request(app)
      .post("/api/bot/fulfillment")
      .send(mockedReuest)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        console.log(res.body, "res.body");
        console.log(res.body.fulfillmentMessages, "fulfillmentMessages");

        expect(res.body.fulfillmentMessages).toBeDefined();
        expect(res.body.fulfillmentMessages[0]).toBeDefined();
        expect(res.body.fulfillmentMessages.length).toBe(1);
        done();
      });
  });

  test("Test with QuickTemplate Intent", (done) => {
    const mockedReuest = {
      responseId: "791ab1d6-45a2-4852-966d-3442bb472dce",
      queryResult: {
        queryText: "quick", parameters: {}, allRequiredParamsPresent: true, fulfillmentMessages: [{ text: { text: [""] } }], intent: { name: "projects/nightingale-456a9/agent/intents/310f01d6-d192-4c08-9a85-97aec8a05c47", displayName: "QuickTemplate" }, intentDetectionConfidence: 1, languageCode: "en",
      },
      originalDetectIntentRequest: { payload: {} },
      session: "projects/nightingale-456a9/agent/sessions/27925210-5b79-99f1-4e57-186f9ef702d3",
    };


    request(app)
      .post("/api/bot/fulfillment")
      .send(mockedReuest)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body.fulfillmentMessages).toBeDefined();
        expect(res.body.fulfillmentMessages[0].quickReplies).toBeDefined();
        expect(res.body.fulfillmentMessages.length).toBe(1);
        done();
      });
  });
});
