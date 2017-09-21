const faker = require('faker');
const {PORT} = require('../config');
const {runServer, closeServer} = require('../server');
const {sequelize} = require('../db/sequelize');
const {User, Hospitalization, Follower} = require ('../models');

//starts server and adds mock data for tests

before(function() {
  return sequelize.sync({force: true})
    .then(() => runServer(PORT));
});

after(function() {
  return closeServer();
});

function buildUser() {
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };
}

function buildHospitalization(userId) {
  const properties = {
    patient: faker.name.firstName(),
    condition: faker.hacker.noun(),
    conscious: faker.random.boolean(),
    latestUpdate: faker.random.words()
  };
  if (userId) {
    properties.user_id = userId;
  }
  return properties;
}

function buildFollowers(userId, followerId) {
  const properties = {
    status: 'pending'
  };
  if (userId) {
    properties.user_id = userId;
  }
  if (followerId) {
    properties.follower_id = followerId;
  }
  return properties;
}

function dropTables() {
  return Promise.all([
    Follower.truncate(),
    Hospitalization.truncate(),
    User.truncate({cascade: true})
  ]);
}

function seedUserWithHospAndFollowers() {
  let userOne, userTwo;
  return User.create(buildUser())
    .then(function(_user) {
      userOne = _user;
      return Hospitalization.create(buildHospitalization(userOne.id))
        .then(function() {
          return User.create(buildUser());
        })
        .then(function(_user) {
          userTwo = _user;
          return Hospitalization.create(buildHospitalization(userTwo.id));
        })
        .then(function() {
          return Follower.create(buildFollowers(userOne.id, userTwo.id));
        });
    });
}

function seedTestData() {
  const usersWithHospsAndFollowers = [];
  for (let i=0; i<5; i++) {
    usersWithHospsAndFollowers.push(seedUserWithHospAndFollowers());
  }
  return Promise.all(usersWithHospsAndFollowers);
}

module.exports = {
  buildUser,
  buildHospitalization,
  buildFollowers,
  dropTables,
  seedTestData
};