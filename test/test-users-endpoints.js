const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const should = chai.should();
const app = require('../app');
const {User, Hospitalization, Friend} = require('../models');
const {buildUser, buildHospitalization, buildFriends, dropTables, seedTestData} 
= require('./helper');

chai.use(chaiHttp);

describe('Users API resource', function() {

  beforeEach(function() {
    console.log('seeding data');
    return seedTestData();
  });

  afterEach(function() {
    console.log('dropping tables');
    return dropTables();
  });

  describe('GET endpoints: users', function() {

    it('should return all users', function() {
      return chai.request(app)
        .get('/users')
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.a('object');
        });
    });

    it('should return user by ID', function() {
      let user;
      return User.findOne()
        .then(function(_user) {
          user = _user;
          return chai.request(app)
            .get(`/users/${user.id}`);
        })
        .then(function(res) {
          res.should.have.status(200);
          res.body.id.should.equal(user.id);
        });
    });

  });

  describe('POST requests: users', function() {

    it('should add new user to DB', function() {
      let newUser;
      return chai.request(app)
        .post('/users').send(buildUser())
        .then(function(res) {
          newUser = res.body;
          res.should.have.status(201);
          return User.findOne({where: {id: newUser.id}});
        })
        .then(function(user) {
          user.id.should.equal(newUser.id);
          user.name.should.equal(newUser.name);
          user.email.should.equal(newUser.email);
        });
    });

  });

  describe('DELETE requests: users', function() {

    it('should delete user', function() {
      let user;
      return User.findOne()
        .then(function(_user) {
          user = _user;
          return chai.request(app)
            .delete(`/users/${user.id}`);
        })
        .then(function(res) {
          res.should.have.status(204);
          return User.findOne({where: {id: user.id}});
        })
        .then(function(res) {
          should.not.exist(res);
        });
    });

  });

});