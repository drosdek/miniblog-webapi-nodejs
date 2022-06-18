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

async function getById(id) {
  return await Author.findById(id);
}

module.exports = {
  getAll,
  create,
  getById,
};
