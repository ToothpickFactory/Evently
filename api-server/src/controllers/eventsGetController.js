const EventsModule = require(appRoot + "/modules/events");
const codes = require(appRoot + '/modules/codes');

module.exports = (req, res) => {
	let query = req.query;
	let clientId = req.auth.clientId;
	EventsModule.getEvents(query, clientId)
		.then(events => res.send(events))
		.catch(err => codes.errRes(err, res))
}