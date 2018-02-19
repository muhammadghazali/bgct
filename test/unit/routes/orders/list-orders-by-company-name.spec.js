const expect = require('chai').expect;
const sinon = require('sinon');
const MockExpressResponse = require('mock-express-response');
const listOrderRouteHandler = require('./../../../../routes/orders/list-order');

describe('Test the list orders by company name route handler', function() {
  it('should not proceed the request if company name is not specified in request query params', async function() {
    const req = {
      query: {
        company: ''
      }
    };
    const res = new MockExpressResponse();
    const spyStatus = sinon.spy(res, 'status').withArgs(400);

    await listOrderRouteHandler(req, res);

    expect(spyStatus.calledOnce).to.be.true;
  });

  it('should proceed the request if company name is specified in request query params', async function() {
    const stubGetOrdersByCompany = sinon.stub().resolves([
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
        company: 'Some big company'
      }
    };
    const res = new MockExpressResponse();
    res.locals = {
      orderService: {
        getOrdersByCompany: stubGetOrdersByCompany
      }
    };
    const spyStatus = sinon.spy(res, 'status').withArgs(200);

    await listOrderRouteHandler(req, res);

    expect(stubGetOrdersByCompany.calledOnce).to.be.true;
    expect(spyStatus.calledOnce).to.be.true;
  });
});
