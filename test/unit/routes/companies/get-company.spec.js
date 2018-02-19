const expect = require('chai').expect;
const sinon = require('sinon');
const MockExpressResponse = require('mock-express-response');
const deleteRouteHandler = require('./../../../../routes/companies/get-company');

let res = new MockExpressResponse();
describe('Test the get company route handler', function() {
  beforeEach(function() {
    res = new MockExpressResponse();
  });

  it('should proceed the request if company id is not specified in request params', async function() {
    const req = { params: {} };
    const spyStatus = sinon.spy(res, 'status').withArgs(400);

    await deleteRouteHandler(req, res);

    expect(spyStatus.calledOnce).to.be.true;
  });

  it('should proceed the request if company id is specified in request params', async function() {
    const stubGetCompanyService = sinon.stub().resolves({});
    const req = {
      params: {
        id: '507f191e810c19729de860ea'
      }
    };
    res.locals = {
      companyService: {
        get: stubGetCompanyService
      }
    };
    const spyStatus = sinon.spy(res, 'status').withArgs(200);

    await deleteRouteHandler(req, res);

    expect(stubGetCompanyService.calledOnce).to.be.true;
    expect(spyStatus.calledOnce).to.be.true;
  });
});
