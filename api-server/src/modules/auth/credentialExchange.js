const config = require("config");

const Mongo = require(appRoot + "/connections/mongo");
const codes = require(appRoot + "/modules/codes");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function credentialExchange(email, password) {
  let db = await Mongo.getDB();
  if (!email || !password) return Promise.reject(codes.credentialsRequired());
  let account = {
    email: email.toUpperCase(),
    password: crypto
      .createHash("SHA1")
      .update(password)
      .digest("hex")
  };

  return db
    .collection("accounts")
    .findOne(account, { _id: 1 })
    .then(dbRes => {
      if (!dbRes) return Promise.reject(codes.userNotFound());
      let token = jwt.sign(dbRes, config.jwt.key, { noTimestamp: true });
      return { token };
    })
    .catch(err => {
      return Promise.reject(err);
    });
}

module.exports = credentialExchange;
