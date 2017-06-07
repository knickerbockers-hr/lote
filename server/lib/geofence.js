const Promise = require('bluebird');
const client = require('redis').createClient();
const geo = Promise.promisifyAll(require('georedis').initialize(client));

module.exports = geo;
