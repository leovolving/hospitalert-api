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

  describe('GET endpoints: followers', function() {

    it('should return followers based on userID', function() {
      let user;
      return User.findOne()
        .then(function(_user) {
          user = _user;
          return chai.request(app)
            .get(`/followers/${user.id}`)
        })
        .then(function(res) {
          res.should.have.status(200);
        });
    });

    it('should return followings based on fId', function() {
      let user;
      return User.findOne()
        .then(function(_user) {
          user = _user;
          return chai.request(app)
            .get(`/followers/following/${user.id}`)
        })
        .then(function(res) {
          res.should.have.status(200);
        });
    });

  });

});