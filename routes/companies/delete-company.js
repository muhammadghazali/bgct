const debug = require('debug')('borderguru-coding-test:route-delete-company');

module.exports = async function(req, res, next) {
  const { id } = req.params;

  const invalidPayload = id === undefined;

  if (invalidPayload) {
    return res.status(400).send({
      message: 'Invalid company identifier'
    });
  }

  try {
    const result = await res.locals.companyService.delete(id);

    if (result.deletedCount === 0) {
      return res.status(404).send({
        message: 'Company not found'
      });
    }

    res.status(204).send({
      message: 'The company has been deleted'
    });
  } catch (error) {
    debug('cannot delete the company', error);
    return res.status(500).send();
  }
};
