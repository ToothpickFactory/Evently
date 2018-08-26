const appRootDir			= require('app-root-dir').get();
const chai            = require("chai");
const chaiAsPromised  = require("chai-as-promised");
const expect          = chai.expect;
const chaiHttp				= require('chai-http');

const core = require(appRootDir + "/src/test/testData/core.json");
const composeEvent = require(appRootDir + "/src/test/helpers/composeEvent");
const removeEventTests = require(appRootDir + "/src/test/helpers/removeEventTests");

chai.should();
chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe('Create Event', function() {

	after(() => removeEventTests(core.clientIds.clientId1));

	describe('#CREATE /events', function() {
	  it('should return a new event', function() {
			
			let event = composeEvent();
			
			return chai.request(core.urls.evently)
				.post(`/events`)
				.send(event)
				.then(res => {
					expect(res.body).to.have.property("_id");
				});

	  });
	});

});