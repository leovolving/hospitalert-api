const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = require('../app');

chai.use(chaiHttp);

describe('API wake-up request', function() {

  it('should get a response from server', function() {
    return chai.request(app)
      .get('/')
      .then(function(res) {
        res.should.have.status(200);
      });
  });

});