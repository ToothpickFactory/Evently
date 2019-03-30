const db = require(appRoot + "/connections/firebase").db;
const codes = require(appRoot + "/modules/codes");
const passwordEncrypt = require('./passwordEncrypt');
const signToken = require('./signToken');

async function credentialExchange(email, password) {
  if (!email || !password) throw codes.credentialsRequired();
  email = email.toUpperCase();
  password = passwordEncrypt(password);
  let account;

  try {
    const accountsRes = await db.collection("accounts")
      .where('email', '==', email)
      .where('password', '==', password)
      .get();

    const accounts = [];
    accountsRes.forEach(accountRes => accounts.push(accountRes.data()));
    account = accounts[0];
  } catch (err) {
    throw codes.serverError(err);
  }

  if (!account) throw codes.userNotFound();

  const tokenFields = {
    uid: account.uid
  };

  const token = signToken(tokenFields);

  return {
    token
  };
}

module.exports = credentialExchange;