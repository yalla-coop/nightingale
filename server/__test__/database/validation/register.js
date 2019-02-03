const validation = require("./../../../validation");

describe("Tesing for register validation", () => {
  test("register validation with valid data", (done) => {
    const data = {
      name: "Name",
      username: "username",
      password: "password",
    };
    validation(data, "register")
      .then((res) => {
        expect(res).toBeDefined();
        done();
      });
  });

  test("register validation with uncompete", (done) => {
    const data = {
      name: "Name",
      username: "username",
    };
    validation(data, "register")
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err).toMatch("\"password\" is required");
        done();
      });
  });

  test("register validation with invalid data", (done) => {
    const data = {
      name: "Name",
      username: "username",
      password: "2",
    };

    validation(data, "register")
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err).toMatch("\"password\" length must be at least 3 characters long");
        done();
      });
  });

  test("register validation with invalid data", (done) => {
    const data = {
      name: "$$$$$",
      username: "username",
      password: "password",
    };

    validation(data, "register")
      .catch((err) => {
        expect(err).toBeDefined();
        expect(err).toMatch("\"name\" must only contain alpha-numeric characters");
        done();
      });
  });
});
