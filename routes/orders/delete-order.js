module.exports = function(req, res, next) {
  const { id } = req.params;

  const invalidPayload = id === undefined;

  if (invalidPayload) {
    return res.status(400).send({
      message: 'Invalid order identifier'
    });
  }

  res.status(204).send({
    orderId: 'The order has been deleted'
  });
};
