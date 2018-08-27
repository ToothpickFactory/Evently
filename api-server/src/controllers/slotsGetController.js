const EventsModule = require(appRoot + "/modules/events");
const codes = require(appRoot + '/modules/codes');

module.exports = (req, res) => {
	let eventId = req.params.id;
	let clientId = req.auth._id;
	EventsModule.getslots(eventId, clientId)
		.then(slots => res.send(slots))
		.catch(err => codes.errRes(err, res))
}