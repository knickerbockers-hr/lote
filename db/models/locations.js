const db = require('../');
const Promise = require('bluebird');

const Location = db.Model.extend({
  tableName: 'locations',
  lotes_sent: function() {
    return this.hasMany('Lote_Sent');
  }
});

module.exports = db.model('Location', Location);
