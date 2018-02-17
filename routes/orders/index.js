var express = require('express');
var router = express.Router();
const createOrder = require('./create-order');
const deleteOrder = require('./delete-order');
const listOrder = require('./list-order');

module.exports = function(db) {
  router.post('/', createOrder);
  router.delete('/:id', deleteOrder);
  router.get('/', listOrder);

  return router;
};
