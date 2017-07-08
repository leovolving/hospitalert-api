'use strict';

const {BasicStrategy} = require('passport-http');
const express = require('express');
const jsonParser = require('body-parser').json();
const passport = require('passport');
const router = express.Router();

const {User, Friend, Hospitalization} = require('../models');

//basic strategy for authentication
const basicStrategy = new BasicStrategy((username, password, callback) => {
  let user;
  User
    .findOne({where: {email: username}})
    .then(_user => {
      user = _user;
      if (!user) {
        return callback(null, false, {message: 'Incorrect username'});
      }
      const isValid = (user.password.trim() === password.trim());
      if (!isValid) {
        return callback(null, false, {message: 'Incorrect password'});
      }
      else {
        return callback(null, user)
      }
    });
});

passport.use(basicStrategy);
router.use(passport.initialize());

//GET requests
router.get('/', (req, res) => User.findAll()
  .then(users => res.json({users: users.map(user =>
  	user.apiRepr())}))
);

router.get('/dashboard', passport.authenticate('basic', {session: false}), (req, res) => 
    res.json(req.user.apiRepr()));


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