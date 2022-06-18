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

function getById(req, res, next) {
  AuthorRepository.getById(req.params.id, res.body)
    .then((author) => (author ? res.json(author) : send.status(404)))
    .catch((err) => next(err));
}

function update(req, res, next) {
  AuthorRepository.update(req.params.id, req.body)
    .then((author) => res.json(author))
    .catch((err) => next(err));
}

module.exports = {
  getAll,
  create,
  getById,
  update,
};
