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

  models.Contact.Sender_Receiver.where({ sender_id: req.params.profileId }).fetchAll()
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
