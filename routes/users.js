'use strict';

const {BasicStrategy} = require('passport-http');
const express = require('express');
const jsonParser = require('body-parser').json();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const router = express.Router();
const sequelize = require('sequelize');

const {User, Friend, Hospitalization} = require('../models');

const basicStrategy = new BasicStrategy((username, password, callback) => {
  console.log(username, password);
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
        return callback(null, user);
      }
    });
});

passport.use(basicStrategy);
router.use(passport.initialize());

//from client-side FB auth
router.post('/facebook', (req, res) => {
  return User.findOrCreate({where: {fbId: req.body.id}, defaults: {
    email: req.body.email,
    name: req.body.name,
    fbId: req.body.id,
    profilePicture: req.body.picture.data.is_silhouette ? null : req.body.picture.data.url
  }})
    .then(user => res.json(user[0].fbRepr()))
    .catch(err => res.status(500).send(err));
});

// for email/password
	  router.get('/dashboard', passport.authenticate('basic', {session: false}), (req, res) => {
	    res.json(req.user.apiRepr());
	    res.redirect('/dashboard');
	  });

//GET requests

//for friend searches
router.get('/:name', (req, res) => { 
  const searchParams = req.params.name.trim().toLowerCase();
  return User.findAll({where: {
    //makes db item all lowercase and accepts only partial matches
    name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchParams + '%')
  }})
    .then(users => res.json({users: users.map(user => user.apiRepr())}));
});

//DELETE request
router.delete('/:id', (req, res) => {
  return User.destroy({where: {id: req.params.id}})
    .then(user => res.status(204).end())
    .catch(err => res.status(500).json({message: 'internal server error'}));
});

module.exports = router;