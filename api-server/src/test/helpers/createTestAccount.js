const appRootDir = require('app-root-dir').get();
const AuthModule = require(appRootDir + "/src/modules/auth");
const core = require("../testData/core.json");

function createTestAccount (email, password) {
	if(!email) {
		email = core.accounts.account1.email;
		password = core.accounts.account1.password;
	}
	return AuthModule.createAccount(email, password);
}

module.exports = createTestAccount;