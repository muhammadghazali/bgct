const expect = require('chai').expect;
const sinon = require('sinon');
const deleteOrderRouteHandler = require('./../../../../routes/orders/delete-order');
const MockExpressResponse = require('mock-express-response');

describe('Test the delete order route handler', function() {
  it('should be defined', function() {
    expect(deleteOrderRouteHandler).to.be.a('function');
  });

  it('should proceed the request if order id is not specified in request params', function() {
    const req = { params: {} };
    const res = new MockExpressResponse();
    const spyStatus = sinon.spy(res, 'status').withArgs(400);

    deleteOrderRouteHandler(req, res);

    expect(spyStatus.calledOnce).to.be.true;
  });

  it('should proceed the request if order id is specified in request params', function() {
    const req = {
      params: {
        id: '507f191e810c19729de860ea'
      }
    };
    const res = new MockExpressResponse();
    const spyStatus = sinon.spy(res, 'status').withArgs(204);

    deleteOrderRouteHandler(req, res);

    expect(spyStatus.calledOnce).to.be.true;
  });
});
