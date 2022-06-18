var { json } = require("express");
var db = require("../middleware/db");

var Author = db.Author;

async function getAll() {
  return await Author.find();
}

module.exports = {
  getAll,
};
