const appRootDir			= require('app-root-dir').get();
const chai            = require("chai");
const chaiAsPromised  = require("chai-as-promised");
const expect          = chai.expect;
const chaiHttp				= require('chai-http');

const core = require(appRootDir + "/src/test/testData/core.json");
const generateEvent = require(appRootDir + "/src/test/helpers/generateEvent");
const removeEventTests = require(appRootDir + "/src/test/helpers/removeEventTests");
const joinEvent = require(appRootDir + "/src/modules/events/joinEvent");

chai.should();
chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe('Leave Event', function() {
	let _event;
	let cp_user = Object.assign({}, core.users.user1);

	before(() => generateEvent()
		.then(event => joinEvent(event._id, cp_user))
		.then(event => _event = event)
	);

	after(() => removeEventTests(core.clientIds.clientId1));

	describe('#DELETE /events/:id/participants/:userId', function() {
	  it('should remove user from event', function() {
			return chai.request(core.urls.evently)
				.delete(`/events/${_event._id}/participants/${cp_user.id}`)
				.then(res => {
					expect(res).to.have.status(200);
				});

			});
	});
});