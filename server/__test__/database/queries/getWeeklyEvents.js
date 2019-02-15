const getWeeklyEvents = require("./../../../database/queries/getWeeklyEvents");
const buildDB = require("./../../../database/dummy_data/index");

// load models
const User = require("./../../../database/models/User");
const WeeklyEvent = require("./../../../database/models/WeeklyEvent");

describe("Testing for getWeeklyEvents query", () => {
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

  test("Function returns weekly events for existing user", async (done) => {
    const user = await User.findOne({ username: "nadia-2009" });

    const result = await getWeeklyEvents(user.id);
    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    expect(result[0].text).toBeDefined();
    expect(result[0].days).toBeDefined();
    done();
  });

  test("Function returns empty array if there's no events for that user stored", async (done) => {
    const result = await getWeeklyEvents("123456789112345678921234");
    expect(result).toBeDefined();
    expect(result.length).toBe(0);
    done();
  });
});
