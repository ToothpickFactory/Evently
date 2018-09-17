const admin = require("firebase-admin");
const serviceAccount = require(appRoot + "/../eventlyFirebaseKey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: process.env.DATABASE_URL
});

const db = admin.firestore();

db.settings({
	timestampsInSnapshots: true
})

module.exports = {
	db
}