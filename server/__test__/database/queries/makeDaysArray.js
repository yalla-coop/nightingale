const mongoose = require("mongoose");

// load function to test
const makeDaysArray = require("../../../database/queries/makeDaysArray");

const buildDB = require("../../../database/dummy_data/index");

describe("Testing the updateUserParams function", () => {
  beforeAll(async () => {
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await buildDB();
  });

  test("test it successfully creates array of integers", (done) => {
    const request = [
      { stringValue: "Monday", kind: "stringValue" },
      { stringValue: "Tuesday", kind: "stringValue" },
      { stringValue: "Wednesday", kind: "stringValue" },
    ];
    const numbersArray = makeDaysArray(request);
    expect(numbersArray).toBeDefined();
    expect(numbersArray).toEqual([1, 2, 3]);
    done();
  });
});
