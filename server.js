var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var errorHandler = require("./middleware/error_handle");
var config = require("config");

var indexRouter = require("./routes/index");
var authorsRouter = require("./routes/authors.route");

var app = express();

if (config.util.getEnv("NODE_ENV") !== "test") {
  app.use(logger("combined")); //'dev' outputs the Apache style LOGs
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/authors", authorsRouter);

// error handler
app.use(errorHandler);

module.exports = app;
