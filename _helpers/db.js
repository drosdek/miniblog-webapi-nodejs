const config = require("config");
const mongoose = require("mongoose");
const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(
  process.env.MONGODB_URI ||
    `mongodb+srv://${config.username}:${config.password}@${config.cluster}.mongodb.net/${config.dbname}?retryWrites=true&w=majority`,
  connectionOptions
);

mongoose.Promise = global.Promise;

module.exports = {
  Author: require("../models/authors.model"),
};
