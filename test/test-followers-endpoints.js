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
  

});