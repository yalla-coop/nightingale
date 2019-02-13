const User = require("../models/User");

const buildUser = () => {
  const defaultUser = {
    username: "nadia-2009",
    name: "Nadia",
    password: "123456",
    school: "Primrose Hill Primary School",
    class: "A-10",
    birthDate: "2009-02-01",
    faveSubj: "Maths",
    leastFaveSubj: "History",
  };
  return User.create(defaultUser);
};

module.exports = buildUser;
