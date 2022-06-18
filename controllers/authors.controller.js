var AuthorRepository = require("../repositories/authors.repository");

function getAll(req, res, next) {
  AuthorRepository.getAll(req)
    .then((authors) =>
      authors === null || authors === [] ? res.status(404) : res.json(authors)
    )
    .catch((err) => next(err));
}

module.exports = {
  getAll,
};
