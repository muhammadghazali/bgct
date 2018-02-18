const expect = require('chai').expect;
const sinon = require('sinon');
const listOrdersRouteHandler = require('./../../../../routes/orders/list-order');
const MockExpressResponse = require('mock-express-response');

describe('Test the list order route handler', function() {
  it('should be defined', function() {
    expect(listOrdersRouteHandler).to.be.a('function');
  });

  describe('Test `Display how often each item has been ordered,`', function() {
    it('should proceed the request if the count is provided in the query', function() {
      const req = {
        query: {
          count: 'Inline Skates'
        }
      };
      const res = new MockExpressResponse();
      const spyStatus = sinon.spy(res, 'status').withArgs(200);

      listOrdersRouteHandler(req, res);

      expect(spyStatus.calledOnce).to.be.true;
    });

    it('should proceed the request if the count is not provided in the query', function() {
      const req = {
        query: {
          count: ''
        }
      };
      const res = new MockExpressResponse();
      const spySendResponse = sinon.spy(res, 'send').withArgs({
        message: 'The item name should be provided in count request query'
      });

      listOrdersRouteHandler(req, res);

      expect(spySendResponse.calledOnce).to.be.true;
    });
  });
});
