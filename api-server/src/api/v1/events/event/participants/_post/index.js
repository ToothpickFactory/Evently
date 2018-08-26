const appRootDir = require('app-root-dir').get();
const EventsModule = require(appRootDir + "/src/modules/events");
const errRes = require(appRootDir + "/src/util/errRes");

// Routes
module.exports = (app) => {

	app.post('/events/:id/participants', (req, res) => {
		let eventId = req.params.id;			
		let participant = req.body;
		let clientId = req.auth._id;
		EventsModule.joinEvent(eventId, participant, clientId)
			.then(response => res.send(response))
			.catch(err => errRes(err, res))
	});

};
