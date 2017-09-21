'use strict';

const {User} = require('./user');
const {Follower} = require('./follower');
const {Hospitalization} = require('./hospitalization');

const db = {User, Follower, Hospitalization};

Object.keys(db).forEach(function(model) {
  if(db[model].associate) {
    db[model].associate(db);
  }
});

module.exports = db;