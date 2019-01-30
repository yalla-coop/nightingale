const buildUser = require("./user");
const buildMood = require("./mood");
const buildWeeklyEvent = require("./weekly_event");
const buildNonSteadyEvent = require("./non_steady_event")
const buildMessage = require("./message");
const buildConversation = require("./conversation");
const dbConnection = require("./../db_connection")
const resetDb = require("./reset_DB");
const mongoose =require("mongoose")


const buildDummyData = () => new Promise((resolve, reject) => {

  dbConnection()
    .then(async () => {
      await resetDb()
      await buildMood();
      await buildUser();
      await buildWeeklyEvent();
      await buildConversation();
      await buildNonSteadyEvent();
      await buildMessage();
    })
    .then(resolve)
    .catch(reject)
});

// check the NODE_ENV
// if it is "test" that mean we run the the build script in terminal
// invoke the build function
if (process.env.NODE_ENV !== 'test') {  
  buildDummyData()
  .then(() => {
    // close the connection after build
      mongoose.disconnect();
    });
}

module.exports = buildDummyData;