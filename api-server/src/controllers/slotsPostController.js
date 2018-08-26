const EventsModule = require(appRoot + "/modules/events");

module.exports = (req, res) => {
	let eventId = req.params.id;
	let participant = req.body;
	let clientId = req.auth._id;
	EventsModule.joinEvent(eventId, participant, clientId)
		.then(response => res.send(response))
		.catch(err => errRes(err, res))
}