import admin from 'firebase-admin';

const serviceAccount: any = {};

for (const key in process.env) {
	if (key.indexOf('FB.') > -1) {
		const [_, keyName] = key.split('.');
		serviceAccount[keyName] = process.env[key];
	}
}

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: process.env.DATABASE_URL
});

const db = admin.firestore();

db.settings({});

export { db };
