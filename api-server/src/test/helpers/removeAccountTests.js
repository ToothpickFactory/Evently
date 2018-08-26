const AuthModule = require(appRoot + "/modules/auth");
const core = require("../testData/core");

function removeAccountTests(email) {
  return AuthModule.removeAccountByEmail(email || core.accounts.account1.email);
}

module.exports = removeAccountTests;
