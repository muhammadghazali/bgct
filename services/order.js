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

    getOrderStatistics: async () => {
      const items = await existingCollection.distinct('orderedItem');

      const countPromises = items.map(async item => {
        const countResult = await existingCollection.count({
          orderedItem: item
        });

        return {
          [item]: countResult
        };
      });

      const result = await Promise.all(countPromises);
      const statistics = {};

      result.forEach(element => {
        Object.assign(statistics, element);
      });

      return statistics;
    }
  };
};
