const expect = require('chai').expect;
const sinon = require('sinon');
const createRouteHandler = require('./../../../../routes/orders/create-order');
const MockExpressResponse = require('mock-express-response');

describe('Test the create order route handler', function() {
  it('should be defined', function() {
    expect(createRouteHandler).to.be.a('function');
  });

  it('should not proceed the request if the request body is invalid', function() {
    const req = { body: {} };
    const res = new MockExpressResponse();
    const spyStatus = sinon.spy(res, 'status');

    createRouteHandler(req, res);

    expect(spyStatus.calledOnce).to.be.true;
  });

  it('should proceed the request if request body is valid', function() {
    const req = {
      body: {
        companyName: 'SuperTrader',
        customerAddress: 'Steindamm 80',
        orderedItem: 'Macbook',
        price: 1700,
        currency: 'EUR'
      }
    };
    const res = new MockExpressResponse();
    const spyStatus = sinon.spy(res, 'status');

    createRouteHandler(req, res);

    expect(spyStatus.notCalled).to.be.true;
  });
});
