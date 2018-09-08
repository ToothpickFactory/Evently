const db = require(appRoot + "/connections/firebase").db;

async function removeAccountByEmail(email) {
  try {
    email = email.toUpperCase();
    const [account] = await db.collection("accounts").where("email", "==", email).get();
    account.delete();
  } catch (err) {
    throw codes.serverError(err);
  }
}

module.exports = removeAccountByEmail;