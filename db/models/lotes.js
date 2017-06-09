const db = require('../');
const Location = require('./locations');
const Profile = require('./profiles');

const Lote_Sent = db.Model.extend({
  tableName: 'lotes_sent',
  lotesReceived: function() {
    return this.hasMany(Lote_Received);
  },
  lote: function() {
    return this.morphTo('lote', Lote_Text, Lote_Audio);
  },
  location: function() {
    return this.belongsTo('Location');
  },
  loteSender: function() {
    return this.belongsTo(Profile, 'sender_id');
  }
});

module.exports.Lote_Sent = Lote_Sent;

const Lote_Received = db.Model.extend({
  tableName: 'lotes_received',
  lotesSent: function() {
    return this.belongsTo(Lote_Sent);
  },
  loteReceiver: function() {
    return this.belongsTo(Profile, 'receiver_id');
  }
});

module.exports.Lote_Received = Lote_Received;

const Lote_Text = db.Model.extend({
  tableName: 'lotes_text',
  lotes_sent: function() {
    return this.morphMany(Lote_Sent, 'lote');
  }
});

module.exports.Lote_Text = Lote_Text;

const Lote_Audio = db.Model.extend({
  tableName: 'lotes_audio',
  lotes_sent: function() {
    return this.morphMany(Lote_Sent, 'lote');
  }
});

module.exports.Lote_Audio = Lote_Audio;
