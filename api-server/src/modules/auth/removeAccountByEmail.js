const db = require(appRoot + "/connections/firebase").db;
const codes = require(appRoot + "/modules/codes");

async function removeAccountByEmail(email) {
  try {
    email = email.toUpperCase();
    const accounts = await db.collection("accounts").where("email", "==", email).get();
    const accountsArr = [];
    accounts.forEach(account => accountsArr.push(account));
    if (accountsArr[0]) await accountsArr[0].ref.delete();
  } catch (err) {
    throw codes.serverError(err);
  }
}

module.exports = removeAccountByEmail;