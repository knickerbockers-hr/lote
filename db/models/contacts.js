const db = require('../');

const Sender_Receiver = db.Model.extend({
  tableName: 'senders_receivers',
  receivers: function() {
    return this.hasMany('Profile');
  }
});

module.exports.Sender_Receiver = Sender_Receiver;
