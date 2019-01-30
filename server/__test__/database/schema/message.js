const mongoose = require('mongoose');
const Message = require("./../../../database/models/Message");
const Conversation = require("./../../../database/models/Conversation");
const buildDB = require("./../../../database/dummy_data/index");

describe('Tesing for Message schema', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  })

  afterAll(async () => {
    await mongoose.disconnect();
  })

  beforeEach(async () => {
    // build dummy data
    await buildDB();
  })

  test('Message should be defined', () => {
    expect(Message).toBeDefined();
  })

  test('Message should contain 11 collections', async () => {
    const messages = await Message.find();
    expect(messages.length).toBe(11)
  })

  test("Message schema validation should work properly", async () => {
    const conversation = await Conversation.findOne(); 
    const newMessage = {
      conversation,
      text: ["Ah nice, What lesson did you have that was good?"],
      sender: "not bot nor user"
    }

    await Message.create(newMessage).catch(err => {
      expect(err).toBeDefined()
    })
  })
})
