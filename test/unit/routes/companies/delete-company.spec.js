const expect = require('chai').expect;
const sinon = require('sinon');
const MockExpressResponse = require('mock-express-response');
const deleteRouteHandler = require('./../../../../routes/companies/delete-company');

let res;
describe('Test the delete company route handler', function() {
  before(function() {
    res = new MockExpressResponse();
  });

  it('should proceed the request if company id is not specified in request params', async function() {
    const req = { params: {} };
    const spyStatus = sinon.spy(res, 'status').withArgs(400);

    await deleteRouteHandler(req, res);

    expect(spyStatus.calledOnce).to.be.true;

    res.status.restore();
  });

  it('should proceed the request if company id is specified in request params', async function() {
    const stubDeleteCompanyService = sinon.stub().resolves({
      deletedCount: 1
    });
    const req = {
      params: {
        id: '507f191e810c19729de860ea'
      }
    };
    res.locals = {
      companyService: {
        delete: stubDeleteCompanyService
      }
    };
    const spyStatus = sinon.spy(res, 'send').withArgs({
      message: 'The company has been deleted'
    });

    await deleteRouteHandler(req, res);

    expect(stubDeleteCompanyService.calledOnce).to.be.true;
    expect(spyStatus.calledOnce).to.be.true;

    res.send.restore();
  });
});
