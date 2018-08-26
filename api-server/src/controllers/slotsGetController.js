const EventsModule = require(appRoot + "/modules/events");

module.exports = (req, res) => {
	let eventId = req.params.id;
	let clientId = req.auth._id;
	EventsModule.getParticipants(eventId, clientId)
		.then(participants => res.send(participants))
		.catch(err => errRes(err, res))
}