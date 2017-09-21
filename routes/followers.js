'use strict';

const express = require('express');
const router = express.Router();

const {User, Follower, Hospitalization} = require('../models');

//GET a list of user's followers
router.get('/:userId', (req, res) => Follower.findAll({
  where: {user_id: req.params.userId},
  include: [{model: User, as: 'follower'}]})
  .then(followers => 
    res.json({followers: followers.map(follower => 
      Object.assign({}, follower.apiRepr(), {followerName: follower.follower.name}))})));

//GET list of accounts user is following
router.get('/following/:fId', (req, res) => Follower.findAll({
  where: {follower_id: req.params.fId},
  include: [{model: User}]})
  .then(followings => 
    res.json({following: followings.map(following =>
      Object.assign({}, following.apiRepr(), {followingName: following.User.name}))})));

module.exports = router;