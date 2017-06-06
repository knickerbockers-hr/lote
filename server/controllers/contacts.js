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
      //console.log ('contacts', contacts);
      res.status(200).send(contacts);
    })
    .catch(err => {
      console.log (err);
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.create = (req, res) => {
  console.log ('create contact');
  console.log (req.body.senderId);
  console.log (req.body.receiverEmail);

  models.Profile.where({ email: req.body.receiverEmail }).fetch()
    .then((profile) => {
      if (profile) {
        return profile;
      }

      return models.Profile.forge({
        email: req.body.receiverEmail
      }).save()
      .error(err => {
        console.error('ERROR: failed to create profile');
        throw err;
      })
      .then((profile) => {
        return models.Auth.forge({
          type: 'local',
          password: 'password', // this should eventually be a randomly generated password
          profile_id: profile.get('id')
        }).save();
      })
      .error(err => {
        console.error('ERROR: failed to create auth');
      });
    })
    .then((result) => {
      console.log ('create an entry in the senders_receivers table', result.id);
      return models.Contact.Sender_Receiver.forge({
        sender_id: req.body.senderId,
        receiver_id: result.id
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create contact');
      throw err;
    })
    .then(result => {
      console.log ('contact created successfully');
      res.status(201).send(result);
    })
    .catch(err => {
      console.log (err);
      res.status(500).send(err);
    });
};

