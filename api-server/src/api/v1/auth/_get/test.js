const appRootDir		= require('app-root-dir').get();
const chai            	= require("chai");
const chaiAsPromised  	= require("chai-as-promised");
const expect          	= chai.expect;
const chaiHttp			= require('chai-http');

const core = require(appRootDir + "/src/test/testData/core.json");
const removeAccountTests = require(appRootDir + "/src/test/helpers/removeAccountTests");
const createTestAccount = require(appRootDir + "/src/test/helpers/createTestAccount");

chai.should();
chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe('Get Auth Token', function() {
	
	before(() => createTestAccount());
	after(() => removeAccountTests(core.accounts.account1.email));

	describe('#GET /auth', function() {
	  it('should return a token', function() {
			let account = Object.assign({}, core.accounts.account1);

			return chai.request(core.urls.evently)
				.get(`/auth`)
				.auth(account.email, account.password)
				.then(res => {
					expect(res.body).to.have.property("token");
				})
				.catch(err => console.log(err))
	  });
	});

});