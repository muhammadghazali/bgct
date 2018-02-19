const sinon = require('sinon');
const expect = require('chai').expect;

describe('Company service', function() {
  let companyService;

  beforeEach(function() {
    companyService = require('./../../../services/company')({});
  });

  describe('check the APIs', function() {
    it('should have get() method to get the company', function() {
      expect(companyService.get).to.be.a('function');
    });

    it('should have delete() method to delete the company', function() {
      expect(companyService.delete).to.be.a('function');
    });

    it('should have update() method to update the company', function() {
      expect(companyService.update).to.be.a('function');
    });

    it('should have create() method to create the company', function() {
      expect(companyService.create).to.be.a('function');
    });
  });

  describe('Test the create method', function() {
    it('should called the updateOne(...)', function() {
      const companyData = {
        name: 'Some big company'
      };
      const collection = {
        create: sinon.spy().withArgs(companyData)
      };

      const companyService = require('./../../../services/company')(collection);
      companyService.create(companyData);

      expect(collection.create.calledOnce).to.be.true;
    });
  });

  describe('Test the update method', function() {
    it('should called the updateOne(...)', function() {
      const companyData = {
        name: 'Some big company'
      };
      const collection = {
        updateOne: sinon.spy().withArgs(companyData)
      };

      const companyService = require('./../../../services/company')(collection);
      companyService.update(companyData);

      expect(collection.updateOne.calledOnce).to.be.true;
    });
  });

  describe('Test the get method', function() {
    it('should called the findOne(...)', function() {
      const collection = {
        findOne: sinon.spy()
      };

      const companyService = require('./../../../services/company')(collection);
      companyService.get('5a8a3fd3dd7c9e6e84f46d0e');

      expect(collection.findOne.calledOnce).to.be.true;
    });
  });

  describe('Test the delete method', function() {
    it('should called the deleteOne(...)', function() {
      const collection = {
        deleteOne: sinon.spy()
      };

      const companyService = require('./../../../services/company')(collection);
      companyService.delete('507f191e810c19729de860ea');

      expect(collection.deleteOne.calledOnce).to.be.true;
    });
  });
});
