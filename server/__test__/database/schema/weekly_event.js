const mongoose = require('mongoose');
const WeeklyEvent = require("../../../database/models/WeeklyEvent");
const buildDB = require("../../../database/dummy_data/index");

describe('Tesing for WeeklyEvent schema', () => {
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

  test('WeeklyEvent should be defined', () => {
    expect(WeeklyEvent).toBeDefined();
  })

  test('WeeklyEvent should contain 2 collections', async () => {
    const weeklyEvents = await WeeklyEvent.find();
    expect(weeklyEvents.length).toBe(2);
  })
})
