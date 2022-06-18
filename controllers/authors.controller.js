var AuthorRepository = require("../repositories/authors.repository");

function getAll(req, res, next) {
  AuthorRepository.getAll(req)
    .then((authors) =>
      authors === null || authors === [] ? res.status(404) : res.json(authors)
    )
    .catch((err) => next(err));
}

function create(req, res, next) {
  const data = req.body;
  AuthorRepository.create(data)
    .then((author) => {
      res.status(201).json(author);
    })
    .catch((err) => next(err));
}

module.exports = {
  getAll,
  create,
};
