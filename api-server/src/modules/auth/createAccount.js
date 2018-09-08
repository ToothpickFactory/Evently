const shortid = require("shortid");
const passwordEncrypt = require('./passwordEncrypt');
const db = require(appRoot + "/connections/firebase").db;
const validateAccount = require(appRoot + "/schemas/account/validator");
const findAccountByEmail = require('./findAccountByEmail');
const codes = require(appRoot + "/modules/codes");

async function createAccount(email, password) {
  const result = validateAccount({
    email,
    password
  });
  if (result.errors.length) throw codes.malformedRequest(result.errors);

  email = email.toUpperCase();
  password = passwordEncrypt(password);

  if (await findAccountByEmail(email)) throw codes.emailTaken();

  const uid = shortid.generate();
  const clientId = shortid.generate();
  return db.collection("accounts").doc(uid).set({
    uid,
    clientId,
    email,
    password
  });
}

module.exports = createAccount;