'use strict';
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers').Profiles;
const LoteController = require('../controllers').Lotes;

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
  .post(LoteController.create)
  ;

module.exports = router;
