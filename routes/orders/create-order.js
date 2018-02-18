const debug = require('debug')('borderguru-coding-test:route-create-order');
const orderService = require('./../../services/order')();

module.exports = async function(req, res, next) {
  const { company, customerAddress, orderedItem, price, currency } = req.body;

  const invalidPayload =
    company === undefined ||
    customerAddress === undefined ||
    orderedItem === undefined ||
    price === undefined ||
    currency === undefined;

  if (invalidPayload) {
    return res.status(400).send({
      message: 'Invalid order'
    });
  }

  try {
    const newData = await oasrderService.create(req.body);
    res.send(newData);
  } catch (error) {
    debug('cannot save the order details', error);
  }
};
