// loops over array of dialogflow parameters
// calls update function as soon as the parameter is part of the response

// load storeInitParams query

const updateUserParams = require("./updateUserParams");
const makeDaysArray = require("./makeDaysArray");

module.exports = (array, object, id) => new Promise((resolve, reject) => {
  if (
    array
      && array.includes(object)
      && Object.prototype.hasOwnProperty.call(object, "parameters")
  ) {
    array.map((e) => {
      // dialogfow terms....
      const param = e.parameters.fields;
      const {
        birthDate, leastFaveSubj, faveSubj, faveSubjDays, leastFaveSubjDays,
      } = param;

      if (birthDate) {
        resolve(updateUserParams(id, "birthDate", birthDate.stringValue));
      }
      if (faveSubj) {
        resolve(updateUserParams(id, "faveSubj", faveSubj.stringValue));
      }
      if (leastFaveSubj) {
        resolve(updateUserParams(id, "leastFaveSubj", leastFaveSubj.stringValue));
      }
      if (faveSubjDays && faveSubjDays.listValue.values.length > 0) {
        console.log(makeDaysArray(faveSubjDays.listValue.values));
      }
      if (leastFaveSubjDays) {
        console.log(leastFaveSubjDays.listValue.values);
      }
    });
  }
  try {
    throw Error();
  } catch (e) {
    reject(e);
  }
});
