const appRootDir = require('app-root-dir').get();
const EventsModule = require(appRootDir + "/src/modules/events");
const errRes = require(appRootDir + "/src/util/errRes");

// Routes
module.exports = (app) => {
	app.delete('/events/:id/participants/:userId', (req, res) => {
		let eventId = req.params.id;			
		let userId = req.params.userId;
		let clientId = req.auth._id;
		EventsModule.leaveEvent(eventId, userId, clientId)
			.then(response => res.send(response))
			.catch(err => errRes(err, res))
	});
};
