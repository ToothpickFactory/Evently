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

describe('Join Event', function() {
	let _event;
	before(() => generateEvent().then(event => _event = event));
	after(() => removeEventTests(core.clientIds.clientId1));

	describe('#POST /events/:id/participants', function() {
	  it('should add user to event', function() {
			let cp_user = Object.assign({}, core.users.user1);

			return chai.request(core.urls.evently)
				.post(`/events/${_event._id}/participants`)
				.send(cp_user)
				.then(res => {
					expect(res.body.participants).to.deep.include.members([cp_user]);
				});

			});
	});
});