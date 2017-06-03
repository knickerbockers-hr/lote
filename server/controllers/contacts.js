const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  console.log ('getting all contacts');
  models.Contact.fetchAll()
    .then(contacts => {
      res.status(200).send(contacts);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.getAllForProfile = (req, res) => {
  console.log ('getting all contacts for profile', req.params.profileId);

  models.Contact.Sender_Receiver.where({ sender_id: req.params.profileId }).fetchAll({withRelated: ['receiver']})
    .then(contacts => {
      console.log ('contacts', contacts);
      res.status(200).send(contacts);
    })
    .catch(err => {
      console.log (err);
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.create = (req, res) => {
  if (req.body.contactType === 'contacts_text') {
    models.Contact.Contact_Text.forge({ message: req.body.message })
      .save()
      .error(err => {
        console.error('ERROR: failed to create contact text');
        throw err;
      })
      .then(result => {
        return models.Contact.Contacts_List
          .forge({
            sender_id: req.body.senderId,
            contact_type: req.body.contactType,
            contact_id: result.id
          })
          .save();
      })
      .error(err => {
        console.error('ERROR: failed to create contacts list');
        throw err;
      })
      .then(result => {
        console.log('contact created successfully'); 
        res.status(201).send(result); 
      })
      .catch(err => {
        res.status(500).send(err); 
      });
  }
};
>>>>>>> Server and DB Changes for Contacts
