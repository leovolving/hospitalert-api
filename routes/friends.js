'use strict';

const express = require('express');
const router = express.Router();

const {User, Friend, Hospitalization} = require('../models');

router.get('/', (req, res) => Friend.findAll()
  .then(friends => res.json(friends)));

module.exports = router;