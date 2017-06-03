const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  console.log ('getting all lotes');
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
  console.log ('getting all lotes for profile', req.params.profileId);

  // ALL lotes with lotesReceived information only if receiver is the logged-in user (this is an atypical use-case)
  // models.Lote.Lote_Sent.fetchAll({withRelated: [ {'lotesReceived': (qb) => qb.where('receiver_id', req.params.profileId) }, 'lote']})

  // ALL lotes sent by logged-in user
  // models.Lote.Lote_Sent.where({ sender_id: req.params.profileId }).fetchAll({withRelated: ['lotesReceived', 'lote']})

  // ALL lotes received by logged-in user
  // models.Lote.Lote_Sent // ALL lotes sent OR received by logged-in user
  //   .query('join', 'lotes_received', 'lotes_sent.id', 'lotes_received.lotes_sent_id')
  //   .where({ 'lotes_received.receiver_id': req.params.profileId })
  //   .fetchAll({withRelated: ['lotesReceived', 'lote']})

  // ONLY lotes sent AND received by the same logged-in user
  // models.Lote.Lote_Sent
  //   .query('join', 'lotes_received', 'lotes_sent.id', 'lotes_received.lotes_sent_id')
  //   .where({ 'lotes_sent.sender_id': req.params.profileId, 'lotes_received.receiver_id': req.params.profileId })
  //   .fetchAll({ withRelated: ['lotesReceived', 'lote'] })

  // ALL lotes sent OR received by logged-in user
  models.Lote.Lote_Sent
    .query('join', 'lotes_received', 'lotes_sent.id', 'lotes_received.lotes_sent_id')
    .query({ where: { 'lotes_sent.sender_id': req.params.profileId }, orWhere: { 'lotes_received.receiver_id': req.params.profileId }, orderBy: 'id' })
    .fetchAll({withRelated: ['lotesReceived', 'lote']})

    .then(lotes => {
      // console.log ('lotes', lotes);
      res.status(200).send(lotes);
    })
    .catch(err => {
      console.log (err);
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};


module.exports.create = (req, res) => {
  console.log ('creating lote');
  if (req.body.loteType === 'lotes_text') {
    models.Lote.Lote_Text.forge({ message: req.body.message })
      .save()
      .error(err => {
        console.error('ERROR: failed to create lote text');
        throw err;
      })
      .then(result => {
        console.log ('lote text created');
        return models.Lote.Lote_Sent
          .forge({
            sender_id: req.body.senderId,
            lote_type: req.body.loteType,
            lote_id: result.id,
            lock: req.body.lock
          })
          .save();
      })
      .error(err => {
        console.error('ERROR: failed to create lote sent');
        throw err;
      })
      .then(result => {
        console.log ('lote received created');
        return models.Lote.Lote_Received
          .forge({
            lotes_sent_id: result.id,
            receiver_id: req.body.receiverId
          })
          .save();
      })
      .error(err => {
        console.error('ERROR: failed to create lote received');
        throw err;
      })
      .then(result => {
        console.log ('lote created successfully');
        res.status(201).send(result);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};

// module.exports.getOne = (req, res) => {
//   console.log ('getting one lote')
//   models.Lote.where({ id: req.params.profileId }).fetch()
//     .then(lote => {
//       if (!lote) {
//         throw lote;
//       }
//       res.status(200).send(lote);
//     })
//     .error(err => {
//       res.status(500).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };

// module.exports.update = (req, res) => {
//   models.Lote.where({ id: req.params.profileId }).fetch()
//     .then(lote => {
//       if (!lote) {
//         throw lote;
//       }
//       return lote.save(req.body, { method: 'update' });
//     })
//     .then(() => {
//       res.sendStatus(201);
//     })
//     .error(err => {
//       res.status(500).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };

// module.exports.deleteOne = (req, res) => {
//   models.Lote.where({ id: req.params.profileId }).fetch()
//     .then(lote => {
//       if (!lote) {
//         throw lote;
//       }
//       return lote.destroy();
//     })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .error(err => {
//       res.status(503).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };
