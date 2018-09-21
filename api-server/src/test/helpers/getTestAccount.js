const jwt = require('jsonwebtoken');
const AuthModule = require(appRoot + "/modules/auth");
const testUser = require(appRoot + "/test/test-data.js").testUser;

async function getTestAccount() {
	let res;
	try {
		res = await AuthModule.credentialExchange(testUser.email, testUser.password);
	} catch (err) {
		await AuthModule.createAccount(testUser.email, testUser.password);
		res = await AuthModule.credentialExchange(testUser.email, testUser.password);
	}

	const account = jwt.verify(res.token, process.env.JWT_KEY);
	return [res.token, account];
}

module.exports = getTestAccount;