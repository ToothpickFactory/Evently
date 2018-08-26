const appRootDir = require('app-root-dir').get();
const EventsModule = require(appRootDir + "/src/modules/events");
const errRes = require(appRootDir + "/src/util/errRes");

// Routes
module.exports = (app) => {
	app.get('/events/:id/participants', (req, res) => {
		let eventId = req.params.id;
		let clientId = req.auth._id;
		EventsModule.getParticipants(eventId, clientId)
			.then(participants => res.send(participants))
			.catch(err => errRes(err, res))
	});
};
