const debug = require('debug')('borderguru-coding-test:company-order');
const { ObjectID } = require('mongodb');

let existingCollection;

module.exports = function(collection) {
  existingCollection = collection;
  return {
    create: data => {
      const creationTimestamp = Date.now();
      let newData = Object.assign(data, {
        updatedAt: creationTimestamp,
        createdAt: creationTimestamp
      });
      return existingCollection.create(newData);
    },

    update: data => {
      const creationTimestamp = Date.now();
      let updatedData = Object.assign(data, {
        updatedAt: creationTimestamp
      });
      return existingCollection.updateOne(updatedData);
    },

    delete: id =>
      existingCollection.deleteOne({ _id: ObjectID.createFromHexString(id) }),

    get: id =>
      existingCollection.findOne({ _id: ObjectID.createFromHexString(id) })
  };
};
