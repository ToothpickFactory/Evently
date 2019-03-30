const EventsModule = require(appRoot + "/modules/events");
const codes = require(appRoot + '/modules/codes');

module.exports = (req, res) => {
	const event = req.event;
	const newEvent = req.body;
	EventsModule.updateEvent(event, newEvent)
		.then(newEvent => res.send(newEvent))
		.catch(err => codes.errRes(err, res))
}