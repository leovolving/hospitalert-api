'use strict';

const express = require('express');
const router = express.Router();

const {User, Friend, Hospitalization} = require('../models');

//GET requests
router.get('/', (req, res) => Hospitalization.findAll()
  .then(hosps => res.json(hosps)));

module.exports = router;