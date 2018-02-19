const expect = require('chai').expect;
const sinon = require('sinon');
const MockExpressResponse = require('mock-express-response');
const listOrderRouteHandler = require('./../../../../routes/orders/list-order');

describe('Test the list orders by customer address route handler', function() {
  it('should not proceed the request if customer address is not specified in request query params', async function() {
    const req = {
      query: {
        address: ''
      }
    };
    const res = new MockExpressResponse();
    const spyStatus = sinon.spy(res, 'status').withArgs(400);

    await listOrderRouteHandler(req, res);

    expect(spyStatus.calledOnce).to.be.true;
  });

  it('should proceed the request if customer address is specified in request query params', async function() {
    const stubGetOrdersByCustomerAddress = sinon.stub().resolves([
      {
        id: '5a89b313627d4440f75e2638',
        company: 'Some big company',
        customerAddress: 'Steindamm 80',
        orderedItem: 'Macbook',
        price: 1700,
        currency: 'EUR',
        createdAt: 1518973715532,
        updatedAt: 1518973715532
      }
    ]);
    const req = {
      query: {
        address: 'Steindamm 80'
      }
    };
    const res = new MockExpressResponse();
    res.locals = {
      orderService: {
        getOrdersByAddress: stubGetOrdersByCustomerAddress
      }
    };
    const spyStatus = sinon.spy(res, 'status').withArgs(200);

    await listOrderRouteHandler(req, res);

    expect(stubGetOrdersByCustomerAddress.calledOnce).to.be.true;
    expect(spyStatus.calledOnce).to.be.true;
  });
});
