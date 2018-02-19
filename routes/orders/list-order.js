const debug = require('debug')('borderguru-coding-test:route-list-order');

module.exports = async function(req, res, next) {
  // TODO handle `Display how often each item has been ordered,
  //  in descending order (ie in the above example, 2x for Macbook and Inline
  // skates, 1x for the rest)` query
  const { address, company, count } = req.query;

  if (address && address.length > 0) {
    const list = await res.locals.orderService.getOrdersByAddress(address);

    return res.status(200).send(list);
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

  if (count === 'true') {
    const result = await res.locals.orderService.getOrderStatistics();

    return res.status(200).send(await result);
  }

  if (count !== 'true') {
    return res.status(400).send({
      message:
        'To get the order statistics the count on request query parameter should be set to true'
    });
  }

  return res.send(200);
};
