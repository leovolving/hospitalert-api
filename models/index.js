'use strict';

const {User} = require('./user');
const {Friend} = require('./friend');
const {Hospitalization} = require('./hospitalization');

const db = {User, Friend, Hospitalization};

Object.keys(db).forEach(function(model) {
  if(db[model].associate) {
    db[model].associate(db);
  }
});

module.exports = db;