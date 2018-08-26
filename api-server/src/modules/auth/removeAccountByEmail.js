const Mongo = require(appRoot + "/connections/mongo");

async function removeAccountByEmail(email) {
  let db = await Mongo.getDB();
  return db.collection("accounts").remove({ email: email.toUpperCase() });
}

module.exports = removeAccountByEmail;
