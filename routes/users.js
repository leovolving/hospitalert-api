'use strict';

const express = require('express');
const router = express.Router();

const {User, Friend, Hospitalization} = require('../models');

//GET requests
router.get('/', (req, res) => User.findAll()
  .then(users => res.json({users: users.map(user =>
  	user.apiRepr())}))
);

router.get('/:id', (req, res) => User.findById(req.params.id)
  .then(user => res.json(user.apiRepr())));


//POST request
router.post('/', (req, res) => {
  const requiredFields = ['email', 'name', 'password'];
  requiredFields.forEach(item => {
    if(!(item in req.body)) {
      const missingContentMessage = `missing ${item} in req.body`;
      return res.status(400).send(missingContentMessage);
    }
  });
  //checks for existing email
  return User.findOne({where: {email: req.body.email}})
    .then(userCheck => {
      if(userCheck !== null) {
        const emailExistsMessage = 'email address already taken';
        return res.status(400).send(emailExistsMessage);
      } else {
        const newUser = {
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
          fbId: req.body.fbId
        };
        return User.create(newUser)
          .then(user =>
            res.status(201).json(user.apiRepr()))
          .catch(err => 
            res.status(500).json({message: 'internal server error'}));
      }
    });
});

//DELETE request
router.delete('/:id', (req, res) => {
  return User.destroy({where: {id: req.params.id}})
    .then(user => res.status(204).end())
    .catch(err => res.status(500).json({message: 'internal server error'}));
});

module.exports = router;