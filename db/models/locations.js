const db = require('../');
const Promise = require('bluebird');

const Location = db.Model.extend({
  tableName: 'locations',
});

module.exports = db.model('Location', Location);
