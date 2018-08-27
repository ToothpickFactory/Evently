const EventsModule = require(appRoot + "/modules/events");
const codes = require(appRoot + '/modules/codes');

module.exports = (req, res) => {
	let eventId = req.params.id;
	let slot = req.body;
	let clientId = req.auth._id;
	EventsModule.joinEvent(eventId, slot, clientId)
		.then(response => res.send(response))
		.catch(err => codes.errRes(err, res))
}