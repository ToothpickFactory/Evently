const AuthModule = require(appRoot + "/modules/auth");
const testUser = require(appRoot + "/test/test-data.json").testUser;

async function getTestAccount() {
	try {
		return await AuthModule.credentialExchange(testUser.email, testUser.password);
	} catch (err) {
		await AuthModule.createAccount(testUser.email, testUser.password);
		return await AuthModule.credentialExchange(testUser.email, testUser.password);
	}
}

module.exports = getTestAccount;