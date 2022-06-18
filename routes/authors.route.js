var express = require("express");
var router = express.Router();
var authors = require("../controllers/authors.controller");

/* GetAll authors listing. */
router.get("/", authors.getAll);
/* Create author */
router.post("/", authors.create);
/* GetById author */
router.get("/:id", authors.getById);
/* Update author */
router.put("/:id", authors.update)
/* Delete author */
router.delete("/:id", authors.remove)

module.exports = router;
