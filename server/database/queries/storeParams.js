// loops over array of dialogflow parameters
// calls update function as soon as the parameter is part of the response

// load storeInitParams query
const updateUserParams = require("./updateUserParams");

module.exports = (array, id) => new Promise(async (resolve, reject) => {
  if (array) {
    array.map((e) => {
      // dialogfow terms....
      const param = e.parameters.fields;
      const { birthDate, leastFaveSubj, faveSubj } = param;

      if (birthDate) {
        resolve(updateUserParams(id, "birthDate", birthDate.stringValue));
      }
      if (faveSubj) {
        resolve(updateUserParams(id, "faveSubj", faveSubj.stringValue));
      }
      if (leastFaveSubj) {
        resolve(updateUserParams(id, "leastFaveSubj", leastFaveSubj.stringValue));
      }
    });
    resolve("sucess updating user info");
  }
  reject();
});
