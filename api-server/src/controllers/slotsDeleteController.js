const EventsModule = require(appRoot + "/modules/events");
const codes = require(appRoot + '/modules/codes');

module.exports = (req, res) => {
	let eventId = req.params.id;
	let userId = req.params.userId;
	let clientId = req.auth._id;
	EventsModule.leaveEvent(eventId, userId, clientId)
		.then(response => res.send(response))
		.catch(err => codes.errRes(err, res))
}