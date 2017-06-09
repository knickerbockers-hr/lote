'use strict';
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers').Profiles;
const LoteController = require('../controllers').Lotes;
const ContactController = require('../controllers').Contacts;

router.route('/')
  .get(ProfileController.getAll)
  // .post(ProfileController.create)
  ;

router.route('/:profileId')
  .get(ProfileController.getOne)
  .put(ProfileController.update)
  // .delete(ProfileController.deleteOne)
  ;

router.route('/:profileId/lotes')
  .get(LoteController.getAllForProfile)
  .post((req, res) => {
    LoteController.create(req)
    .then(result => {
      res.status(201).send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
  });

router.route('/:profileId/contacts')
  .get(ContactController.getAllForProfile)
  .post(ContactController.create)
  ;

module.exports = router;
