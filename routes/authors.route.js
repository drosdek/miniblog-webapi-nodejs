var express = require("express");
var router = express.Router();
var authors = require("../controllers/authors.controller");

/* GET authors listing. */
router.get("/", authors.getAll);

module.exports = router;
