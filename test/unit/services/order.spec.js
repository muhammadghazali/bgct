const sinon = require('sinon');
const expect = require('chai').expect;

describe('Order service', function() {
  let orderService;

  beforeEach(function() {
    orderService = require('./../../../services/order')({});
  });

  describe('check the APIs', function() {
    it('should have create() method to create the order', function() {
      expect(orderService.create).to.be.a('function');
    });

    it('should have getOrdersByCompany() method to get orders by company', function() {
      expect(orderService.getOrdersByCompany).to.be.a('function');
    });

    it('should have getOrdersByAddress() method to get orders by address', function() {
      expect(orderService.getOrdersByAddress).to.be.a('function');
    });

    it('should have getOrderStatistics() method to get order statistics', function() {
      expect(orderService.getOrderStatistics).to.be.a('function');
    });
  });

  describe('Test the create method', function() {
    it('should called the insertOne(...)', function() {
      const orderData = {
        company: 'Some big company',
        customeAddress: 'Steindamm 80',
        orderedItem: 'Macbook',
        price: 1700,
        currency: 'EUR'
      };
      const collection = {
        insertOne: sinon.spy().withArgs(orderData)
      };

      const orderService = require('./../../../services/order')(collection);
      orderService.create(orderData);

      expect(collection.insertOne.calledOnce).to.be.true;
    });
  });

  describe('Test the delete method', function() {
    it('should called the deleteOne(...)', function() {
      const collection = {
        deleteOne: sinon.spy().withArgs('507f191e810c19729de860ea')
      };

      const orderService = require('./../../../services/order')(collection);
      orderService.delete('507f191e810c19729de860ea');

      expect(collection.deleteOne.calledOnce).to.be.true;
    });
  });
});
