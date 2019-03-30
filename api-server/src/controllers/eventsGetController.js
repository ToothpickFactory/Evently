const EventsModule = require(appRoot + "/modules/events");
const codes = require(appRoot + '/modules/codes');

module.exports = (req, res) => {
	let query = req.query;
	EventsModule.getEvents(query)
		.then(events => res.send(events))
		.catch(err => codes.errRes(err, res))
}