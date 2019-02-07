const request = require("supertest");
const mongoos = require("mongoose");
const User = require("./../../database/models/User");
const Conversation = require("./../../database/models/Conversation");
const Message = require("./../../database/models/Message");

const buildDB = require("./../../database/dummy_data/index");
const app = require("./../../app");

describe("Tesing for register API schema", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoos.disconnect();
  });

  beforeEach(async () => {
    // build dummy data
    await buildDB();
  });

  test("test get messages", async (done) => {
    const user = await User.findOne();
    const conversations = await Conversation.findOne();
    Message.aggregate([
      {
        $match: {
          conversations: mongoos.Types.ObjectId(conversations.id),
        },
      },
    ]);
    request(app)
      .get(`/api/user/${user.id}/conversations/${conversations.id}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        done();
      });
  });
});
