const mongoose = require("mongoose");
const storeMessages = require("./../../router/bot/storeMessages");
const User = require("./../../database/models/User");
const Message = require("./../../database/models/Message");
const Conversation = require("./../../database/models/Conversation");


const buildDB = require("./../../database/dummy_data");

describe("Testing the storeMessages function", () => {
  beforeAll(async () => {
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await buildDB();
  });

  test("test with user messages", async (done) => {
    const user = await User.findOne({ username: "nadia-2009" });

    const currentConversation = await Conversation.findOne({ user: user.id, completed: false });
    const userMessages = await Message.find({ conversation: currentConversation, sender: "user" });

    // before we store the new message
    expect(userMessages).toHaveLength(5);

    storeMessages("this is a message from Nadia", [{}], user.id)
      .then(async () => {
        const userMessagesNew = await Message.find({ conversation: currentConversation, sender: "user" });
        // after we stored the new message
        expect(userMessagesNew).toHaveLength(6);
        done();
      });
  });

  test("test with bot messages", async (done) => {
    const user = await User.findOne({ username: "nadia-2009" });

    const currentConversation = await Conversation.findOne({ user: user.id, completed: false });
    const botMessages = await Message.find({ conversation: currentConversation, sender: "bot" });

    // before we store the new message
    expect(botMessages).toHaveLength(6);


    // 2 messages from bot
    const messages = [
      {
        platform: "PLATFORM_UNSPECIFIED",
        text: {
          text: ["Hi, Nadia"],
        },
        message: "text",
      },
      {
        platform: "PLATFORM_UNSPECIFIED",
        text: {
          text: ["My name’s Nightingale"],
        },
        message: "text",
      },
    ];

    storeMessages("", messages, user.id)
      .then(async () => {
        const botMessagesNew = await Message.find({ conversation: currentConversation, sender: "bot" });

        // after we stored the new message
        expect(botMessagesNew).toHaveLength(8);

        done();
      });
  });
});
