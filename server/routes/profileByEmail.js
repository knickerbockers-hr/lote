'use strict';
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers').Profiles;

router.route('/:email')
  .get(ProfileController.getOneByEmail)
  // .put(ProfileController.update)
  ;

module.exports = router;
