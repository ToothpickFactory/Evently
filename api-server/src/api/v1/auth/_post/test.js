const appRootDir		= require('app-root-dir').get();
const chai            	= require("chai");
const chaiAsPromised  	= require("chai-as-promised");
const expect          	= chai.expect;
const chaiHttp			= require('chai-http');

const core = require(appRootDir + "/src/test/testData/core.json");
const removeAccountTests = require(appRootDir + "/src/test/helpers/removeAccountTests");


chai.should();
chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe('Create Auth Token', function() {

	after(() => removeAccountTests(core.accounts.account1.email));

	describe('#CREATE /auth', function() {
	  it('should return a token', function() {
			let account = Object.assign({}, core.accounts.account1);

			return chai.request(core.urls.evently)
				.post(`/auth`)
				.send(account)
				.then(res => {
					expect(res).to.have.status(200);
				});
	  });
	});

});