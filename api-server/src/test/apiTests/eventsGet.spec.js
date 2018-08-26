const appRootDir		= require('app-root-dir').get();
const chai            	= require("chai");
const chaiAsPromised  	= require("chai-as-promised");
const expect          	= chai.expect;
const chaiHttp			= require('chai-http');

const core = require(appRootDir + "/src/test/testData/core.json");
const generateEvent = require(appRootDir + "/src/test/helpers/generateEvent");
const removeEventTests = require(appRootDir + "/src/test/helpers/removeEventTests");

chai.should();
chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe('Get Events', function() {

	before(() => generateEvent());
	after(() => removeEventTests(core.clientIds.clientId1));

	describe('#GET /events', function() {
		it('should return a list of events', function() {
				return chai.request(core.urls.evently)
					.get(`/events/`)
					.then(res => {
						expect(res.body).to.be.an("array");
					});
		});
	});

	describe('#GET /events?tags=test', function() {
		before(() => generateEvent({tags: ['foo']}));
		before(() => generateEvent({tags: ['foo', 'bar']}));
		
		it('should return 2 events by tags query', function() {
			return chai.request(core.urls.evently)
				.get(`/events/`)
				.query({tags: ['foo']})
				.then(res => {
					expect(res.body.length).to.equal(2);
				});
		});

		it('should return 1 events by tags query', function() {
			return chai.request(core.urls.evently)
				.get(`/events/`)
				.query({tags: ['foo', 'bar']})
				.then(res => {
					expect(res.body.length).to.equal(1);
				});
		});
	});


});