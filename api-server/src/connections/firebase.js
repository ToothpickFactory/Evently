const admin = require("firebase-admin");
const config = require('config');
const serviceAccount = require(appRoot + "/../eventlyFirebaseKey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: config.firebase.databaseURL
});

const db = admin.firestore();

db.settings({
	timestampsInSnapshots: true
})

module.exports = {
	db
}