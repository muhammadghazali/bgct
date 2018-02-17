const debug = require('debug')('borderguru-coding-test:database-connection');
const MongoClient = require('mongodb').MongoClient;

let client;

/**
 * Initialize connection to MongoDB
 * @param {Object} options The connect options
 * @param {String} uri The MongoDB URI
 */
exports.connect = async function(options) {
  try {
    client = await MongoClient.connect(options.uri);
    return client;
  } catch (err) {
    debug(err.stack);
    throw err;
  }
};

exports.getDb = function(name) {
  if (name === undefined) {
    throw new Error('Database name is required');
  }

  return client.db(name);
};

exports.close = () => client.close();
