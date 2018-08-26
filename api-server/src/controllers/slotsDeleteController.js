const EventsModule = require(appRoot + "/modules/events");

module.exports = (req, res) => {
	let eventId = req.params.id;
	let userId = req.params.userId;
	let clientId = req.auth._id;
	EventsModule.leaveEvent(eventId, userId, clientId)
		.then(response => res.send(response))
		.catch(err => errRes(err, res))
}