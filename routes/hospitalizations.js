'use strict';

const express = require('express');
const router = express.Router();

const {User, Friend, Hospitalization} = require('../models');

//GET requests
router.get('/', (req, res) => Hospitalization.findAll()
  .then(hosps => res.json({hospitalizations: 
  	hosps.map(hosp => hosp.apiRepr())})));

router.get('/:userId', (req, res) => Hospitalization.findAll({
  where: {user_id: req.params.userId}
})
  .then(hosps => res.json({hospitalizations: hosps.map(hosp =>
    hosp.apiRepr())})));

//POST request
router.post('/', (req, res) => {
  const requiredFields = ['patient', 'condition'];
  const possibleExtraFields = ['conscious', 'latestUpdate', 'isAForm'];
  requiredFields.forEach(field => {
    if(!(field in req.body)) {
      const message = `Missing ${field} from req.body`;
      return res.status(400).send(message);
    }
  });
  const newEntry = {
    patient: req.body.patient,
    condition: req.body.condition
  };
  possibleExtraFields.forEach(field => {
    if(field in req.body) {
      newEntry[field] = req.body[field];
    }
  });
  newEntry.user_id = (req.body.user_id ? req.body.user_id : 1);
  return Hospitalization.create(newEntry)
    .then(hosp => res.status(201).json(hosp.apiRepr()))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

//PUT request
router.put('/:id', (req, res) => {
  if (req.params.id !== req.body.id.toString()) {
    const message = 'ID in req.params and req.body must match';
    return res.status(400).send(message);
  }
  const toUpdate = {};
  const possibleFields = ['conscious', 'latestUpdate', 'isAForm'];
  possibleFields.forEach(field => {
    if(field in req.body) {
      toUpdate[field] = req.body[field];
    }
    return Hospitalization.update(toUpdate, {where: {id: req.params.id}})
      .then(hosp => res.status(204).end())
      .catch(err => res.status(500).json({message: 'internal server error'}));
  });
});

//DELETE request
router.delete('/:id', (req, res) => {
  return Hospitalization.destroy({where: {id: req.params.id}})
    .then(hosp => res.status(204).end())
    .catch(err => res.status(500).json({message: 'internal server error'}));
});

module.exports = router;