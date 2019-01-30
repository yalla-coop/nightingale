const mongoose = require('mongoose');
const User = require("./../../../database/models/User");
const buildDB = require("./../../../database/dummy_data/index");
var {
  compare
} = require('bcryptjs');

describe('Test User schema', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  })

  afterAll(() => {
    mongoose.disconnect();
  })

  beforeEach(async () => {
    // build dummy data
    await buildDB();
  })

  test('should User schema be defined', async () => {
    expect(User).toBeDefined();
  })

  test('should User has one collection with name Nadia', async () => {
    // find all users
    const users = await User.find();
    expect(users.length).toBe(1)
    expect(users[0].name).toBe("Nadia");
  })

  test('should User should add new user properly', async () => {
    const newUser = {
      username: "asala",
      name: "Asala",
      password: "123456",
      school: "Gaza Kids Primary School",
      class: "B-10",
      birthDate: "2010-02-01"
    }

    await User.create(newUser);

    // get the new user info
    const storedNewUser = await User.findOne({
      username: "asala"
    })

    expect(storedNewUser).toBeDefined();
    expect(storedNewUser.name).toBe("Asala");
  })

  test('should pre hook store the hashed password correctly', async (done) => {
    const user = await User.findOne();
    compare("123456", user.password).then((isTrue) => {
      expect(isTrue).toBeTruthy()
    }).then(async () => {
      compare("Wrong Passwprd", user.password).then((isTrue) => {
        expect(isTrue).toBeFalsy()
        done()
      });

    })
  })

  test("User schema should not accept duplicated user name", async (done) => {
    // define a user with duplicate username
    const newUser = {
      username: "nadia-2009",
      name: "Nadia",
      password: "123456",
      school: "Gaza Kids Primary School",
      class: "B-10",
      birthDate: "2010-02-01"
    }

    // User schema should return an error
    await User.create(newUser).catch((err) => {
      expect(err).toBeDefined()
      done()
    })
  })
})