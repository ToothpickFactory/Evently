const appRootDir = require('app-root-dir').get();
const AuthModule = require(appRootDir + "/src/modules/auth");
const core = require("../testData/core");

function removeAccountTests(email){
	return AuthModule.removeAccountByEmail(email || core.accounts.account1.email);
}

module.exports = removeAccountTests;