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

const Contacts_List = db.Model.extend({
  tableName: 'contacts_list',
  contactsReceived: function() {
    return this.hasMany(Contact_Received); 
  },
  contact: function() {
    return this.morphTo('contact', Contact_Text, Contact_Audio); 
  }
});

//not sure if we're gonna need this for contacts but I included it anyway
const Contact_Received = db.Model.extend({
  tableName: 'contacts_received',
  contactsList: function() {
    return this.belongsTo(Contacts_List);
  }
});

const Contact_Text = db.Model.extend({
  tableName: 'contacts_text',
  contacts_list: function() {
    return this.morphMany(Contacts_List, 'contact');
  }
});

const Contact_Audio = db.Model.extend({
  tableName: 'contacts_audio',
  contacts_list: function() {
    return this.morphMany(Contacts_List, 'contact');
  }
});

module.exports.Contacts_List = Contacts_List; 
module.exports.Contact_Received = Contact_Received;
module.exports.Contact_Text = Contact_Text;
module.exports.Contact_Audio = Contact_Audio;
module.exports.Sender_Receiver = Sender_Receiver;
