const appRootDir = require('app-root-dir').get();
const EventsModule = require(appRootDir + "/src/modules/events");
const errRes = require(appRootDir + "/src/util/errRes");

// Routes
module.exports = (app) => {
	app.post('/events', (req, res) => {
		let clientId = req.auth._id;
		EventsModule.createEvent(req.body, clientId)
			.then(newEvent => res.send(newEvent))
			.catch(err => errRes(err, res))
	});
};
