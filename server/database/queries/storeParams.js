// acts like a controller to handle the dialogflow response madness
// if no one understands wtf is going on here I don't neither

// loops over array of dialogflow parameters
// waits until respecitve values are coming in
// calls update function as soon as the parameter is part of the response
// creates weekly event as soon as user answered the question of subject and days...

// load queries

const updateUserParams = require("./updateUserParams");
const storeWeeklyEvents = require("./storeWeeklyEvents");

// array is the overall response from dialogflow
// object is the object inside the array made of more objects

module.exports = (array, object, id) => new Promise((resolve, reject) => {
  if (
  // check if everything is there
    array
      && array.includes(object)
      && Object.prototype.hasOwnProperty.call(object, "parameters")
  ) {
    array.map((e) => {
      // those dialogfow terms....
      const param = e.parameters.fields;
      // destructure the values set in dialogflow
      const {
        birthDate, leastFaveSubj, faveSubj, faveSubjDays, leastFaveSubjDays,
      } = param;
        // wait until all data came through
      if (
        birthDate
          && faveSubj
          && leastFaveSubj
          && faveSubjDays
          && faveSubjDays.listValue.values.length
          && leastFaveSubjDays
          && leastFaveSubjDays.listValue.values.length
      ) {
        // run functions
        resolve(updateUserParams(id, "birthDate", birthDate.stringValue));
        resolve(updateUserParams(id, "faveSubj", faveSubj.stringValue));
        resolve(updateUserParams(id, "leastFaveSubj", leastFaveSubj.stringValue));
        resolve(
          storeWeeklyEvents(
            id,
            faveSubjDays.listValue.values,
            "faveSubj",
            faveSubj.stringValue,
            4,
          ),
        );
        resolve(
          storeWeeklyEvents(
            id,
            leastFaveSubjDays.listValue.values,
            "leastFaveSubj",
            leastFaveSubj.stringValue,
            1,
          ),
        );
      }
      return false;
    });
  }
  try {
    throw Error;
  } catch (e) {
    reject(e);
  }
});
