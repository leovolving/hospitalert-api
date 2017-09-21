const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const should = chai.should();
const app = require('../app');
const {User, Hospitalization, Follower} = require('../models');
const {buildUser, buildHospitalization, buildFollowers, dropTables, seedTestData} 
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

    it('should get users by Name', function() {
      let user;
      return User.findOne()
        .then(function(_user) {
          user = _user;
          return chai.request(app)
            .get(`/users/${user.name}`)
        })
        .then(function(res) {
          res.should.be.a('object');
          res.body.users.should.be.a('array');
          res.body.users[0].name.should.equal(user.name);
        });
    });

  });

  describe('POST endpoints: users', function() {

    it('should create new user', function() {
      let user;
      const newUser = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        id: faker.random.uuid(),
        picture: {data: {url: faker.internet.url()}}
      };
      return chai.request(app)
        .post('/users/facebook').send(newUser)
        .then(function(_user) {
          user = _user.body;
          return User.findOne({where: {id: user.id}})
        })
        .then(function(res) {
          res.id.should.equal(user.id);
          res.name.should.equal(newUser.name);
          res.email.should.equal(newUser.email);
          res.fbId.should.equal(newUser.id);
          res.profilePicture.should.equal(newUser.picture.data.url);
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