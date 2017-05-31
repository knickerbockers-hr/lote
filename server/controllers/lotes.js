const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  console.log ('getting all lotes');
  models.Lote.fetchAll()
    .then(lotes => {
      res.status(200).send(lotes);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.getAllForProfile = (req, res) => {
  console.log ('getting all lotes for profile', req.params.profileId);
  models.Lote.Lote_Sent.where({ sender_id: req.params.profileId }).fetchAll({withRelated: ['lotesReceived', 'lote']})
    .then(lotes => {
      res.status(200).send(lotes);
    })
    .catch(err => {
      console.log (err);
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.create = (req, res) => {
  if (req.body.loteType === 'lotes_text') {
    models.Lote.Lote_Text.forge({ message: req.body.message })
      .save()
      .error(err => {
        console.error('ERROR: failed to create lote text');
        throw err;
      })
      .then(result => {
        return models.Lote.Lote_Sent
          .forge({
            sender_id: req.body.senderId,
            lote_type: req.body.loteType,
            lote_id: result.id
          })
          .save();
      })
      .error(err => {
        console.error('ERROR: failed to create lote sent');
        throw err;
      })
      .then(result => {
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
