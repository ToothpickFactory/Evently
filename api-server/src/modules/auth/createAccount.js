const shortid = require("shortid");
const crypto = require("crypto");

const validateAccount = require(appRoot + "/schemas/account/validator");
const Mongo = require(appRoot + "/connections/mongo");

async function createAccount(email, password) {
  let db = await Mongo.getDB();
  let result = validateAccount({
    email,
    password
  });

  if (result.errors.length) return Promise.reject(result.errors);

  let account = {
    _id: shortid.generate(),
    email: email.toUpperCase(),
    password: crypto
      .createHash("SHA1")
      .update(password)
      .digest("hex")
  };

  return db.collection("accounts").insert(account);
}

module.exports = createAccount;
