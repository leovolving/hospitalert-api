'use strict';

const express = require('express');
const router = express.Router();

const {User, Friend, Hospitalization} = require('../models');

//GET requests
router.get('/', (req, res) => Friend.findAll()
  .then(friends => res.json({friends: friends.map(friend =>
  	friend.apiRepr())})));

router.get('/:userId', (req, res) => Friend.findAll({
  where: {user_id: req.params.userId}
})
  .then(friends => res.json({friends: friends.map(friend => friend.apiRepr())})));

//POST request
router.post('/', (req, res) => {
  const requiredFields = ['user_id', 'friend_id', 'status'];
  requiredFields.forEach(field => {
    if(!(field in req.body)) {
      const message = `Missing ${field} in request body`;
      return res.status(400).send(message);
    }
  });
  return Friend.create(req.body)
    .then(friend => res.status(201).json(friend.apiRepr()))
    .catch(err => res.status(500).json({message: 'internal server error'}))
});

router.put('/:id', (req, res) => {
  if(!('status' in req.body)) {
    return res.status(400).send('missing status in req.body');
  }
  Friend.update({
    status: req.body.status
  },
  {
    where: {id: req.params.id}
  })
    .then(friend => res.status(204).end())
    .catch(err => res.status(500).json({message: 'internal server error'}));
});

router.delete('/:id', (req, res) => {
  return Friend.destroy({where: {id: req.params.id}})
    .then(friend => res.status(204).end())
    .catch(err => res.status(500).json({message: 'internal server error'}));
});

module.exports = router;