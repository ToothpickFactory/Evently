const appRootDir = require('app-root-dir').get();
const EventsModule = require(appRootDir + "/src/modules/events");
const errRes = require(appRootDir + "/src/util/errRes");

// Routes
module.exports = (app) => {
	app.get('/events/:id', (req, res) => {
		let id = req.params.id;
		let clientId = req.auth._id;
		EventsModule.getEvent(id, clientId)
			.then(event => res.send(event))
			.catch(err => errRes(err, res))
	});
};
