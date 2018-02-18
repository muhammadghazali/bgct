const debug = require('debug')('borderguru-coding-test:route-delete-order');

module.exports = async function(req, res, next) {
  const { id } = req.params;

  const invalidPayload = id === undefined;

  if (invalidPayload) {
    return res.status(400).send({
      message: 'Invalid order identifier'
    });
  }

  try {
    const result = await res.locals.orderService.delete(id);

    if (result.deletedCount === 0) {
      return res.status(404).send({
        message: 'Order not found'
      });
    }

    res.status(204).send({
      message: 'The order has been deleted'
    });
  } catch (error) {
    debug('cannot delete the order', error);
    return res.status(500).send();
  }
};
