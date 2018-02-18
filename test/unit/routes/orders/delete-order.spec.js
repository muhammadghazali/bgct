const expect = require('chai').expect;
const sinon = require('sinon');
const MockExpressResponse = require('mock-express-response');
const deleteOrderRouteHandler = require('./../../../../routes/orders/delete-order');

describe('Test the delete order route handler', function() {
  it('should be defined', function() {
    expect(deleteOrderRouteHandler).to.be.a('function');
  });

  it('should proceed the request if order id is not specified in request params', async function() {
    const req = { params: {} };
    const res = new MockExpressResponse();
    const spyStatus = sinon.spy(res, 'status').withArgs(400);

    await deleteOrderRouteHandler(req, res);

    expect(spyStatus.calledOnce).to.be.true;
  });

  it('should proceed the request if order id is specified in request params', async function() {
    const stubDeleteOrderService = sinon.stub().resolves({
      deletedCount: 1
    });
    const req = {
      params: {
        id: '507f191e810c19729de860ea'
      }
    };
    const res = new MockExpressResponse();
    res.locals = {
      orderService: {
        delete: stubDeleteOrderService
      }
    };
    const spyStatus = sinon.spy(res, 'send').withArgs({
      message: 'The order has been deleted'
    });

    await deleteOrderRouteHandler(req, res);

    expect(stubDeleteOrderService.calledOnce).to.be.true;
    expect(spyStatus.calledOnce).to.be.true;
  });
});
