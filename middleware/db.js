const config = require("config");
const mongoose = require("mongoose");
const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose
  .connect(
    process.env.MONGODB_URI ||
      `mongodb+srv://${config.username}:${config.password}@${config.cluster}.mongodb.net/${config.dbname}?retryWrites=true&w=majority`,
    connectionOptions
  )
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
  });

mongoose.Promise = global.Promise;

module.exports = {
  Author: require("../models/authors.model"),
  Article: require("../models/articles.model"),
  Category: require("../models/categories.model"),
  Comment: require("../models/comments.model"),
};
