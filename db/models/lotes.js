const db = require('../');
const Location = require('./locations');

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
  }
});

module.exports.Lote_Sent = Lote_Sent;

const Lote_Received = db.Model.extend({
  tableName: 'lotes_received',
  lotesSent: function() {
    return this.belongsTo(Lote_Sent);
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
