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

	});

});