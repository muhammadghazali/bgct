var express = require('express');
var router = express.Router();

module.exports = function(db) {
  /**
   * Create new order
   */
  router.post('/', function(req, res, next) {
    const {
      companyName,
      customerAddress,
      orderedItem,
      price,
      currency
    } = req.body;

    const invalidPayload =
      companyName === undefined ||
      customerAddress === undefined ||
      orderedItem === undefined ||
      price === undefined ||
      currency === undefined;

    if (invalidPayload) {
      return res.status(400).send({
        message: 'Invalid order'
      });
    }

    res.send({
      orderId: 'The created order identifier'
    });
  });

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
