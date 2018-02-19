const debug = require('debug')('borderguru-coding-test:route-update-company');

module.exports = async function(req, res, next) {
  const { name } = req.body;

  const invalidPayload = name === undefined;

  if (invalidPayload) {
    return res.status(400).send({
      message: 'Invalid company'
    });
  }

  try {
    const newData = await res.locals.companyService.update(req.body);

    res.send({ id: newData.insertedId });
  } catch (error) {
    debug('cannot save the company details', error);
  }
};
