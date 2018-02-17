var express = require('express');
var router = express.Router();
const createOrder = require('./create-order');

module.exports = function(db) {
  router.post('/', createOrder);

  router.delete('/', function(req, res, next) {
    res.send('respond with a resource');
  });

  router.get('/', function(req, res, next) {
    // TODO handle `Show all orders to a particular address` query
    // TODO handle `Show all orders to a particular address` query
    // TODO handle `Display how often each item has been ordered,
    //  in descending order (ie in the above example, 2x for Macbook and Inline
    // skates, 1x for the rest)` query
    res.send('show all orders');
  });

  return router;
};
