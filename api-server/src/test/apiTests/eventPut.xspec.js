const appRootDir			= require('app-root-dir').get();
const chai            = require("chai");
const chaiAsPromised  = require("chai-as-promised");
const expect          = chai.expect;
const chaiHttp				= require('chai-http');

const core = require(appRootDir + "/src/test/testData/core.json");
const generateEvent = require(appRootDir + "/src/test/helpers/generateEvent");
const removeEventTests = require(appRootDir + "/src/test/helpers/removeEventTests");

chai.should();
chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe('Update Event', function() {
	let _event;
	before(() => generateEvent().then(event => _event = event));
	after(() => removeEventTests(core.clientIds.clientId1));

	describe('#PUT /event/:eventId', function() {
	  it('should update event name', function() {
			let newTitle = "Mr McTesty";
			let newIshEvent = Object.assign({}, _event, {title: newTitle});

			return chai.request(core.urls.evently)
				.put(`/events/${_event._id}`)
				.send(newIshEvent)
				.then(res => {
					expect(res.body).to.have.property("title").that.equals(newTitle);
				});

			});
	});

	it('should update the tags in the event', function() {
		let newIshEvent = Object.assign({}, _event, {tags: core.tags.tags1});
		return chai.request(core.urls.evently)
			.put(`/events/${_event._id}`)
			.send(newIshEvent)
			.then(res => {
				expect(res.body).to.have.property("tags").that.contains(core.tags.tags1[0]);
			});
		});
});