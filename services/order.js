const debug = require('debug')('borderguru-coding-test:service-order');
const { ObjectID } = require('mongodb');

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

    delete: id =>
      existingCollection.deleteOne({ _id: ObjectID.createFromHexString(id) }),

    getOrdersByCompany: companyName =>
      existingCollection.find({ company: companyName }).toArray(),

    getOrdersByAddress: customerAddress =>
      existingCollection.find({ customerAddress: customerAddress }).toArray(),

    getOrderStatistics: async function(options) {
      // TODO run a distinct operation in orders collection
      // TODO count the number of documents for each of the result from distinct operation
      return null;
    }
  };
};
