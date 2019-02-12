const decideFlow = require("./../../../database/queries/decideFlow")
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

  test("Function returns a string", (done) => {

    const result = decideFlow("event")
    expect(result).toBeDefined();
    expect(typeof result).toBe("string")
    done();

  });


});
