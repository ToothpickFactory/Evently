const shortid = require("shortid");
const db = require(appRoot + "/connections/firebase").db;

async function createAnonymous() {
	const uid = shortid.generate();
	await db.collection("accounts").doc(uid).set({ uid });
	return uid;
}

module.exports = createAnonymous;