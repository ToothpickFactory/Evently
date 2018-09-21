const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;
const chaiHttp = require('chai-http');
const testData = require("../test-data.js");
const getTestAccount = require('../helpers/getTestAccount');

chai.should();
chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe('Get Auth Token', function () {
	before(async () => await getTestAccount());

	describe('#GET /auth', function () {
		it('should return a token', async () => {
			const res = await chai.request(testData.url)
				.get(`/auth`)
				.auth(testData.testUser.email, testData.testUser.password);

			expect(res.body).to.have.property("token");
		});
	});

});