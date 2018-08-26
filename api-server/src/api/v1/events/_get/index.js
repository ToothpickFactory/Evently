const appRootDir = require('app-root-dir').get();
const EventsModule = require(appRootDir + "/src/modules/events");
const errRes = require(appRootDir + "/src/util/errRes");

// Routes
module.exports = (app) => {
	app.get('/events', (req, res) => {
		let query = req.query;
		let clientId = req.auth._id;
		EventsModule.getEvents(query, clientId)
			.then(events => res.send(events))
			.catch(err => errRes(err, res))
	});
};
