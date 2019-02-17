const Context = require("./../models/Context");

module.exports = userId => Context.findOne({ user: userId });
