const expect = require('chai').expect;
const sinon = require('sinon');
const updateRouteHandler = require('./../../../../routes/companies/update-company');
const MockExpressResponse = require('mock-express-response');

describe('Test the update company route handler', function() {
  it('should not proceed the request if the request body is invalid', async function() {
    const req = { body: {} };
    const res = new MockExpressResponse();
    const spyStatus = sinon.spy(res, 'status').withArgs(400);

    await updateRouteHandler(req, res);

    expect(spyStatus.calledOnce).to.be.true;
  });

  it('should proceed the request if request body is valid', async function() {
    const stubCreateCompanyService = sinon.stub().resolves({
      updatedCount: 1
    });
    const req = {
      body: {
        name: 'SuperTrader'
      }
    };

    const res = new MockExpressResponse();
    res.locals = {
      companyService: {
        update: stubCreateCompanyService
      }
    };
    const spyStatus = sinon.spy(res, 'send');

    await updateRouteHandler(req, res);

    expect(stubCreateCompanyService.calledOnce).to.be.true;
    expect(spyStatus.called).to.be.true;
  });
});
