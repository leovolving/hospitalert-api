'use strict';

const express = require('express');
const router = express.Router();

const {User, Friend, Hospitalization} = require('../models');

//GET requests
router.get('/', (req, res) => Hospitalization.findAll()
  .then(hosps => res.json({hospitalizations: 
  	hosps.map(hosp => hosp.apiRepr())})));

module.exports = router;