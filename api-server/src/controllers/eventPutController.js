const EventsModule = require(appRoot + "/modules/events");

module.exports = (req, res) => {
	let id = req.params.id;
	let clientId = req.auth._id;
	EventsModule.updateEvent(id, req.body, clientId)
		.then(newEvent => res.send(newEvent))
		.catch(err => errRes(err, res))
}