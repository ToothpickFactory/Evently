const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;
const chaiHttp = require('chai-http');
const testData = require("../test-data.js");
const composeEvent = require("../helpers/composeEvent");
const removeEventTests = require("../helpers/removeEventTests");
const getTestAccount = require('../helpers/getTestAccount');

chai.should();
chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe('Create Event', function () {
	let token, account;
	before(async () => [token, account] = await getTestAccount());

	describe('#CREATE /events', function () {
		it('should return a new event', function () {
			console.log(token, account)
			// testData.event();
			// let event = composeEvent();

			// return chai.request(core.urls.evently)
			// 	.post(`/events`)
			// 	.send(event)
			// 	.then(res => {
			// 		expect(res.body).to.have.property("_id");
			// 	});

		});
	});

});