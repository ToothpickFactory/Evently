const EventsModule = require(appRoot + "/modules/events");

module.exports = (req, res) => {
	let clientId = req.auth._id;
	EventsModule.createEvent(req.body, clientId)
		.then(newEvent => res.send(newEvent))
		.catch(err => errRes(err, res))
}