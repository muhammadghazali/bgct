var express = require('express');
var router = express.Router();

module.exports = function(db) {
  /* GET orders listing. */
  router.get('/', function(req, res, next) {
    console.log('db');
    res.send('respond with a resource');
  });

  return router;
};
