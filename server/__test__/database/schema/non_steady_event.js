const mongoose = require("mongoose");
const NonSteadyEvent = require("./../../../database/models/NonSteadyEvent");
const buildDB = require("./../../../database/dummy_data/index");

describe("Tesing for NonSteadyEvent schema", () => {
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

  test("NonSteadyEvent should be defined", () => {
    expect(NonSteadyEvent).toBeDefined();
  });

  test("NonSteadyEvent should contain 2 collections", async () => {
    const nonSteadyEvents = await NonSteadyEvent.find();
    expect(nonSteadyEvents.length).toBe(2);
  });
});
