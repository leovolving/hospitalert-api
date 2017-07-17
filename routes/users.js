'use strict';

const {BasicStrategy} = require('passport-http');
const express = require('express');
const jsonParser = require('body-parser').json();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const router = express.Router();
const {APP_ID, APP_SECRET} = require('../config');
const sequelize = require('sequelize');

const {User, Friend, Hospitalization} = require('../models');

//basic strategy for authentication
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

const facebookStrategy = new FacebookStrategy({
  clientID: APP_ID,
  clientSecret: APP_SECRET,
  callbackURL: 'http://www.example.com/auth/facebook/callback'
},
function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({where: {fbId: profile.id}, defaults: {
    email: profile.email, name: profile.name}}, 
  function(err, user) {
    if (err) { return done(err); }
    done(null, user);
  });
}
);

passport.use(basicStrategy);
passport.use(facebookStrategy);
router.use(passport.initialize());

//facebook auth
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
    failureRedirect: '/login' }));

//GET requests
router.get('/', (req, res) => User.findAll()
  .then(users => res.json({users: users.map(user =>
    user.apiRepr())}))
);

router.get('/dashboard', passport.authenticate('basic', {session: false}), (req, res) => {
  res.json(req.user.apiRepr())});

  //for friend searches
router.get('/:name', (req, res) => { 
  const searchParams = req.params.name.trim().toLowerCase();
  return User.findAll({where: {
    //makes db item all lowercase and accepts only partial matches
    name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + searchParams + '%')
  }})
    .then(users => res.json({users: users.map(user => user.apiRepr())}));
});


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