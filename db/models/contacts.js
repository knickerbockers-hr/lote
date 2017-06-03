const db = require('../');
const Profile = require('./profiles');

const Sender_Receiver = db.Model.extend({
  tableName: 'senders_receivers',
  sender: function() {
    return this.belongsTo(Profile, 'sender_id');
  },
  receiver: function() {
    return this.belongsTo(Profile, 'receiver_id', 'id');
  }
});

module.exports.Sender_Receiver = Sender_Receiver;
