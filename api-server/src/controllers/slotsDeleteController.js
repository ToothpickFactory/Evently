const EventsModule = require(appRoot + "/modules/events");
const codes = require(appRoot + '/modules/codes');

module.exports = (req, res) => {
	const event = req.event;
	const userId = req.params.userId;
	EventsModule.leaveEvent(event, userId)
		.then(() => res.send())
		.catch(err => codes.errRes(err, res))
}