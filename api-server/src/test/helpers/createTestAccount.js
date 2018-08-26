const AuthModule = require(appRoot + "/modules/auth");
const core = require("../testData/core.json");

function createTestAccount(email, password) {
  if (!email) {
    email = core.accounts.account1.email;
    password = core.accounts.account1.password;
  }
  return AuthModule.createAccount(email, password);
}

module.exports = createTestAccount;
