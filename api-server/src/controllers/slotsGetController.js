const EventsModule = require(appRoot + "/modules/events");
const codes = require(appRoot + '/modules/codes');

module.exports = (req, res) => {
	const event = req.event;
	EventsModule.getSlots(event)
		.then(slots => res.send(slots))
		.catch(err => codes.errRes(err, res))
}