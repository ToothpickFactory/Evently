const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;
const chaiHttp = require('chai-http');
const testData = require("../test-data.js");
const removeTestAccount = require("../helpers/removeTestAccount");


chai.should();
chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe('Create Auth Token', function () {

	before(async () => await removeTestAccount());
	after(async () => await removeTestAccount());

	describe('#CREATE /auth', function () {
		it('should return a token', async () => {
			const res = await chai.request(testData.url)
				.post(`/auth`)
				.send({
					"email": testData.testUser.email,
					"password": testData.testUser.password
				})

			expect(res).to.have.status(200);
		});
	});

});