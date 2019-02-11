const moment = require("moment")

const decideFlow = event => {
  // check if weekend or weekday

  const weekday = moment().weekday() > 0 && moment().weekday() < 6;

  if (!weekday) {
    return "weekend"
  } else {
    return "weekday"
  }

}

module.exports = decideFlow