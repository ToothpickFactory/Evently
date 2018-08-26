const appRootDir	= require('app-root-dir').get();
const Mongo       = require(appRootDir + '/src/connections/mongo');

async function removeByClientId(clientId){
	let db = await Mongo.getDB();
	return db.collection('events').deleteMany({clientId});
}

module.exports = removeByClientId;
