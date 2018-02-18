module.exports = function(req, res, next) {
  // TODO handle `Display how often each item has been ordered,
  //  in descending order (ie in the above example, 2x for Macbook and Inline
  // skates, 1x for the rest)` query
  const { address, company, count } = req.query;

  // TODO handle `Show all orders to a particular address` query
  if (address && address.length > 0) {
    return res.status(200).send([]);
  }

  if (address === '') {
    return res.status(400).send({
      message: 'The order address should not be empty'
    });
  }

  // TODO handle `Show all orders from a particular company` query
  if (company && company.length > 0) {
    return res.status(200).send([]);
  }

  if (company === '') {
    return res.status(400).send({
      message: 'The order company should not be empty'
    });
  }

  // TODO handle `Display how often each item has been ordered` query
  if (count && count.length > 0) {
    return res.status(200).send([]);
  }

  if (count === '') {
    return res.status(400).send({
      message: 'The item name should be provided in count request query'
    });
  }

  return res.send(200);
};
