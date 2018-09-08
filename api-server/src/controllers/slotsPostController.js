const EventsModule = require(appRoot + "/modules/events");
const codes = require(appRoot + '/modules/codes');

module.exports = (req, res) => {
	const event = req.event;
	const slot = req.body;
	EventsModule.joinEvent(event, slot)
		.then(response => res.send(response))
		.catch(err => codes.errRes(err, res))
}