const debug = require('debug')('borderguru-coding-test:service-order');
const dbConnection = require('./../services/database-connection');

let existingCollection;
module.exports = function(collection) {
  existingCollection = collection;
  return {
    create: data => {
      const creationTimestamp = Date.now();
      let newData = Object.assign(data, {
        createdAt: creationTimestamp,
        updatedAt: creationTimestamp
      });
      return existingCollection.insertOne(newData);
    },

    getOrdersByCompany: async function(options) {
      return null;
    },

    getOrdersByAddress: async function(options) {
      return null;
    },

    getOrderStatistics: async function(options) {
      return null;
    }
  };
};
