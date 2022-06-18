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

async function update(id, authorParam) {
  const author = await Author.findById(id);

  // check if found author
  if (!author) throw "Author não encontrado!";


  // copy authorParam property to author
  Object.assign(author, authorParam);

  await author.save();

  return author;
}

module.exports = {
  getAll,
  create,
  getById,
  update,
};
