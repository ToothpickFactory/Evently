const EventsModule = require(appRoot + "/modules/events");

module.exports = (req, res) => {
	let eventId = req.params.id;
	let clientId = req.auth._id;
	EventsModule.getslots(eventId, clientId)
		.then(slots => res.send(slots))
		.catch(err => errRes(err, res))
}