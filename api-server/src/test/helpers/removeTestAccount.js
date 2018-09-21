
const AuthModule = require(appRoot + "/modules/auth");
const testUser = require("../test-data").testUser;

async function removeTestAccount() {
  return AuthModule.removeAccountByEmail(testUser.email);
}

module.exports = removeTestAccount;
