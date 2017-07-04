'use strict';

const express = require('express');
const router = express.Router();

const {User, Friend, Hospitalization} = require('../models');

//GET requests
router.get('/', (req, res) => User.findAll()
  .then(users => res.json({users: users.map(user =>
  	user.apiRepr())}))
);

module.exports = router;