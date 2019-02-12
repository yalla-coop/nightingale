const moment = require("moment");

const decideFlow = (event) => {
  // check if weekend or weekday

  const weekday = moment().weekday() > 0 && moment().weekday() < 6;

  if (!weekday) {
    return "weekend";
  }
  // next thing to do here would be to check if we have information
  // about fave subject or least fave subject
  return "weekday";
};

module.exports = decideFlow;
