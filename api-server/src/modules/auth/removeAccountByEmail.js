const appRootDir    = require('app-root-dir').get();
const Mongo         = require(appRootDir + '/src/connections/mongo');

async function removeAccountByEmail (email) {
	let db = await Mongo.getDB();
	return db.collection('accounts').remove({email: email.toUpperCase()});
}

module.exports = removeAccountByEmail;