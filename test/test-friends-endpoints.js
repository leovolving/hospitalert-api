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

  describe('GET endpoints: friends', function() {

    it('should return all friends', function() {
      return chai.request(app)
        .get('/friends')
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.a('object');
        });
    });

    it('should retrieve friends of specific user', function() {
      let user;
      return User.findOne()
        .then(function(_user) {
          user = _user;
          return chai.request(app)
            .get(`/friends/${user.id}`)
        })
        .then(function(res) {
          res.should.have.status(200);
          res.body.friends.should.be.a('array');
          res.body.friends[0].user_id.should.equal(user.id);
        })
    })

  });

});