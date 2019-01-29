const mongoose = require('mongoose');

let mongoURI = process.env.MONGO_URI;

if (process.env.NODE_ENV === 'test') {
  // change mongoURI to testing database URI
  mongoURI = process.env.MONGOURI_TEST;
}

// create DB connection
const dbConnection = () => mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
  },
);

module.exports = dbConnection;