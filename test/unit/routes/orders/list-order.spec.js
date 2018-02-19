const expect = require('chai').expect;
const sinon = require('sinon');
const listOrdersRouteHandler = require('./../../../../routes/orders/list-order');
const MockExpressResponse = require('mock-express-response');

describe('Test the list order route handler', function() {
  it('should be defined', function() {
    expect(listOrdersRouteHandler).to.be.a('function');
  });
});
