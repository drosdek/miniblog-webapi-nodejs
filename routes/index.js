var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome to API for miniblog!');
});

module.exports = router;
