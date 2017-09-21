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

  describe('GET endpoints: hospitalizations', function() {

    it('should return all hospitalizations with specific userId', function() {
      let user;
      return User.findOne()
        .then(function(_user) {
          user = _user;
          return chai.request(app)
            .get(`/hospitalizations/${user.id}`)
        })
        .then(function(res) {
          res.should.have.status(200);
          res.body.hospitalizations.should.be.a('array');
          res.body.hospitalizations[0].user_id.should.equal(user.id);
        });
    });

  });

  describe('POST endpoints: hositalizations', function() {

    it('should create and post a new hospitalization', function() {
      let newHosp;
      return User.findOne()
        .then(function(user) {
          newHosp = buildHospitalization(user.id);
          return chai.request(app)
            .post('/hospitalizations').send(newHosp)
        })
        .then(function(res) {
          res.should.have.status(201);
          res.body.patient.should.equal(newHosp.patient);
          res.body.condition.should.equal(newHosp.condition);
          res.body.conscious.should.equal(newHosp.conscious);
          res.body.latestUpdate.should.equal(newHosp.latestUpdate);
        });
    });

  });

  describe('PUT endpoints: hospitalizations', function() {

    it('should update hospitalization', function() {
      let id;
      const newItems = {
        conscious: false,
        latestUpdate: 'wkjqweb wkavq;ow'
      };
      return Hospitalization.findOne()
        .then(function(_hosp) {
          id = _hosp.id;
          newItems.id = id;
          newItems.isAForm = !(_hosp.isAForm);
          return chai.request(app)
            .put(`/hospitalizations/${id}`).send(newItems)
        })
        .then(function(res) {
          res.should.have.status(204);
          return Hospitalization.findOne({where: {id: id}})
        })
        .then(function(hosp) {
          hosp.conscious.should.equal(newItems.conscious);
          hosp.latestUpdate.should.equal(newItems.latestUpdate);
          hosp.isAForm.should.equal(newItems.isAForm);
        });
    });
  });

  describe('DELETE endpoints: hospitalizations', function() {

    it('should delete hospitalization', function() {
      let hosp;
      return Hospitalization.findOne()
        .then(function(_hosp) {
          hosp = _hosp;
          return chai.request(app)
            .delete(`/hospitalizations/${hosp.id}`)
        })
        .then(function(res) {
          res.should.have.status(204);
          return Hospitalization.findOne({where: {id: hosp.id}})
        })
        .then(function(res) {
          should.not.exist(res);
        });
    });

  });

});