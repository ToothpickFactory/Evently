const db = require(appRoot + "/connections/firebase").db;
const codes = require(appRoot + "/modules/codes");

async function findAccount(email = '') {
	try {
		const accountsRes = await db.collection("accounts")
			.where('email', '==', email.toUpperCase())
			.get();

		const accounts = [];
		accountsRes.forEach(accountRes => accounts.push(accountRes.data()));
		return accounts[0];
	} catch (err) {
		throw codes.serverError(err);
	}
}


module.exports = findAccount;