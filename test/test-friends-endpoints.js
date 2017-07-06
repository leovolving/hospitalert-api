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

  // describe('GET endpoints: friends', function() {

  //   it('should return all friends', function() {
  //     return chai.request(app)
  //       .get('/friends')
  //       .then(function(res) {
  //         res.should.have.status(200);
  //         res.should.be.a('object');
  //       });
  //   });

  //   it('should retrieve friends of specific user', function() {
  //     let user;
  //     return User.findOne()
  //       .then(function(_user) {
  //         user = _user;
  //         return chai.request(app)
  //           .get(`/friends/${user.id}`)
  //       })
  //       .then(function(res) {
  //         res.should.have.status(200);
  //         res.body.friends.should.be.a('array');
  //         res.body.friends[0].user_id.should.equal(user.id);
  //       });
  //   });

  // });

  describe('POST endpoints', function() {
    it('should add new friend', function() {
      const newFriend = {
        status: 'pending'
      };
      return User.findOne()
        .then(function(user) {
          newFriend.user_id = user.id;
          return User.findOne()
        })
        .then(function(_friend) {
          newFriend.friend_id = _friend.id;
          console.log(newFriend);
          return chai.request(app)
            .post('/friends').send(newFriend)
        })
        .then(function(res) {
          res.should.have.status(201);
          console.log(res.body);
          res.body.user_id.should.equal(newFriend.user_id);
          res.body.friend_id.should.equal(newFriend.friend_id);
          res.body.status.should.equal(newFriend.status);
        });
    });
  });

  // describe('PUT endpoints: friends', function() {

  //   it('should update status of friend', function() {
  //     let friend;
  //     return Friend.findOne()
  //       .then(function(_friend) {
  //         friend = _friend;
  //         return chai.request(app)
  //           .put(`/friends/${friend.id}`).send({
  //             status: 'active'
  //           })
  //       })
  //       .then(function(res) {
  //         res.status.should.equal(204);
  //         return Friend.findOne({where: {id: friend.id}})
  //       })
  //       .then(function(foo) {
  //         foo.status.should.equal('active');
  //       });
  //   });

  // });

  // describe('DELETE endpoints: friends', function() {
  //   it('should delete friend', function() {
  //     let friend;
  //     return Friend.findOne()
  //       .then(function(_friend) {
  //         friend = _friend;
  //         return chai.request(app)
  //           .delete(`/friends/${friend.id}`)
  //       })
  //       .then(function(res) {
  //         res.should.have.status(204);
  //         return Friend.findOne({where: {id: friend.id}})
  //       })
  //       .then(function(res) {
  //         should.not.exist(res);
  //       });
  //   });
  // });

});