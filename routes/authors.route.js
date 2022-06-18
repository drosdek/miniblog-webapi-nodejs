var express = require("express");
var router = express.Router();
var authors = require("../controllers/authors.controller");

/* GET authors listing. */
router.get("/", authors.getAll);
/* POST author */
router.post("/", authors.create);
/* GET ID author */
router.get("/:id", authors.getById);

module.exports = router;
