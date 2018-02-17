module.exports = function(req, res, next) {
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
};
