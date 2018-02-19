const expect = require('chai').expect;
const sinon = require('sinon');
const MockExpressResponse = require('mock-express-response');
const listOrderRouteHandler = require('./../../../../routes/orders/list-order');

describe('Test get order statistics route handler', function() {
  it('should not proceed the request if count is not set to true in request query params', async function() {
    const req = {
      query: {
        count: ''
      }
    };
    const res = new MockExpressResponse();
    const spyStatus = sinon.spy(res, 'status').withArgs(400);

    await listOrderRouteHandler(req, res);

    expect(spyStatus.calledOnce).to.be.true;
  });

  it('should proceed the request if count is set to true', async function() {
    const stubGetOrderStatistics = sinon.stub().resolves({
      Macbook: 2,
      Skate: 1
    });
    const req = {
      query: {
        count: 'true'
      }
    };
    const res = new MockExpressResponse();
    res.locals = {
      orderService: {
        getOrderStatistics: stubGetOrderStatistics
      }
    };
    const spyStatus = sinon.spy(res, 'status').withArgs(200);

    await listOrderRouteHandler(req, res);

    expect(stubGetOrderStatistics.calledOnce).to.be.true;
    expect(spyStatus.calledOnce).to.be.true;
  });
});
