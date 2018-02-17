const sinon = require('sinon');
const expect = require('chai').expect;
const MongoClient = require('mongodb').MongoClient;

const dbConnection = require('./../../../services/database-connection');

describe('Database connection', function() {
  describe('check the APIs', function() {
    it('should have connect() method to initialize connection', function() {
      expect(dbConnection.connect).to.be.a('function');
    });

    it('should have getDb() method to get database instance', function() {
      expect(dbConnection.getDb).to.be.a('function');
    });

    it('should have close() method to close existing connection', function() {
      expect(dbConnection.close).to.be.a('function');
    });
  });

  describe('Test connect()', function() {
    before(function() {
      sinon.spy(MongoClient, 'connect');
    });
    after(function() {
      MongoClient.connect.restore();
    });

    it('should called the MongoClient.connect', async function() {
      const dbOptions = {
        uri: 'mongodb://localhost:27017'
      };

      const connection = await dbConnection.connect(dbOptions);

      expect(MongoClient.connect.calledOnce).to.be.true;
    });

    it('should thrown an Error if MongoDB URI is not provided', async function() {
      try {
        const connection = await dbConnection.connect();
      } catch (err) {
        expect(MongoClient.connect.calledOnce).to.be.true;

        expect(err.message).to.be.contain(
          `Cannot read property 'uri' of undefined`
        );
      }
    });
  });

  describe('Test getDb()', function() {
    let dbStub = sinon.stub();
    dbStub.returns({});

    beforeEach(function() {
      sinon.stub(MongoClient, 'connect').resolves({
        db: dbStub
      });
    });

    afterEach(function() {
      MongoClient.connect.restore();
    });

    it('should return the DB instance', async function() {
      const dbOptions = {
        uri: 'mongodb://localhost:27017'
      };

      const connection = await dbConnection.connect(dbOptions);
      const db = dbConnection.getDb('xxx');

      expect(MongoClient.connect.calledOnce).to.be.true;
      expect(dbStub.calledOnce).to.be.true;
      expect(dbStub.getCall(0).args).to.includes('xxx');
      expect(db).to.be.an('object');
    });

    it('should thrown an Error if name not provided', async function() {
      try {
        const dbOptions = {
          uri: 'mongodb://localhost:27017'
        };

        const connection = await dbConnection.connect(dbOptions);
        const db = dbConnection.getDb();
      } catch (err) {
        expect(err.message).to.be.contain('Database name is required');
      }
    });
  });

  describe('Test close()', function() {
    let closeStub = sinon.stub();
    closeStub.returns({});

    beforeEach(function() {
      sinon.stub(MongoClient, 'connect').resolves({
        close: closeStub
      });
    });

    afterEach(function() {
      MongoClient.connect.restore();
    });

    it('should called the MongoClient.close()', async function() {
      const dbOptions = {
        uri: 'mongodb://localhost:27017'
      };

      const connection = await dbConnection.connect(dbOptions);
      dbConnection.close();

      expect(closeStub.calledOnce).to.be.true;
    });
  });
});
