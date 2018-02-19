const debug = require('debug')('borderguru-coding-test:route-get-company');

module.exports = async function(req, res, next) {
  const { id } = req.params;

  const invalidPayload = id === undefined;

  if (invalidPayload) {
    return res.status(400).send({
      message: 'Invalid company identifier'
    });
  }

  try {
    const result = await res.locals.companyService.get(id);

    if (!result) {
      return res.status(404).send({
        message: 'Company not found'
      });
    }

    res.status(200).send(result);
  } catch (error) {
    debug('cannot get the company', error);
    return res.status(500).send();
  }
};
