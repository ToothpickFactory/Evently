require('dotenv').config();
const path = require('path');
global.appRoot = path.resolve(__dirname + '/..');

module.exports = {
	testUser: {
		email: "test@teamcraft.io",
		password: "S1rT3sTa1ot"
	},
	get url() {
		return `${process.env.BASE_URL}:${process.env.PORT}`;
	},
	event(clientId) {
		return {
			clientId,
			title: "Test Event",
			maxSlots: 10,
			startTime: Date.now() + 300000,
			owner: "TestUser",
			webhook: "http://myeventhook.com/webhook"
		}
	},
}