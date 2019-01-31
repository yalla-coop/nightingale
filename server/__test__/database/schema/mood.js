const mongoose = require("mongoose");
const Mood = require("./../../../database/models/Mood");
const buildDB = require("./../../../database/dummy_data/index");

describe("Test Mood schema", () => {
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

  test("should Mood schema be defined", async () => {
    expect(Mood).toBeDefined();
  });

  test("should Mood has 5 coolections", async () => {
    // find all users
    const moods = await Mood.find();
    expect(moods.length).toBe(5);
    expect(moods[0].moodDescription).toBe("amazing");
  });

  test("should Mood should add new mood properly", async () => {
    const newMood = {
      moodEmoji: "😊",
      moodDescription: "happy",
      score: 3.5,
    };

    await Mood.create(newMood);

    // get the new mood info
    const moods = await Mood.find();
    expect(moods.length).toBe(6);

    // check new stored mood
    const storedNewMood = moods[5];
    expect(storedNewMood.moodEmoji).toBe(newMood.moodEmoji);
    expect(storedNewMood.moodDescription).toBe(newMood.moodDescription);
    expect(storedNewMood.score).toBe(newMood.score);
  });

  test("Mood schema validation", async (done) => {
    // define new mood with score greater than the maxuimum
    const newMood = {
      moodEmoji: "😊",
      moodDescription: "happy",
      score: 5.5,
    };

    await Mood.create(newMood).catch((err) => {
      expect(err).toBeDefined();
      done();
    });
  });
});
