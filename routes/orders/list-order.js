const debug = require('debug')('borderguru-coding-test:route-list-order');

module.exports = async function(req, res, next) {
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

  if (company && company.length > 0) {
    const list = await res.locals.orderService.getOrdersByCompany(company);

    return res.status(200).send(list);
  }

  if (company === '') {
    return res.status(400).send({
      message: 'The company name should not be empty'
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
