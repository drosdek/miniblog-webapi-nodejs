var { json } = require("express");
var db = require("../middleware/db");

var Author = db.Author;

async function getAll() {
  return await Author.find();
}

async function create(authorParam) {
  const author = new Author(authorParam);

  await author.save();

  return author;
}

module.exports = {
  getAll,
  create,
};
