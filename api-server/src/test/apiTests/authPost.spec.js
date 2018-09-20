const chai            	= require("chai");
const chaiAsPromised  	= require("chai-as-promised");
const expect          	= chai.expect;
const chaiHttp			= require('chai-http');
//const removeAccountTests = require("../helpers/removeAccountTests");
const testData = require("../test-data.js");

chai.should();
chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe('Create Auth Token', function() {

	//after(() => removeAccountTests(core.accounts.account1.email));

	describe('#CREATE /auth', function() {
	  it('should return a token', function() {
		  console.log(testData.url)
			return chai.request(testData.url)
				.post(`/auth`)
				.send({
					"email": testData.testUser.email,
					"password": testData.testUser.password
				  })
				.then(res => {
					expect(res).to.have.status(200);
				});
	  });
	});

});