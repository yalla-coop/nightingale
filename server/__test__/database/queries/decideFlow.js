const decideFlow = require("./../../../database/queries/decideFlow");
const buildDB = require("./../../../database/dummy_data/index");

describe("Tesing for decideFlow query", () => {
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

  test("Function returns a string", async (done) => {
    const result = await decideFlow("event");
    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
    done();
  });

  test("Event returns start if fed in", async (done) => {
    const result = await decideFlow("start");
    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
    expect(result).toEqual("start");
    done();
  });
});
