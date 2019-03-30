const EventsModule = require(appRoot + "/modules/events");
const codes = require(appRoot + '/modules/codes');

module.exports = (req, res) => {
	EventsModule.createEvent(req.body)
		.then(newEvent => res.send(newEvent))
		.catch(err => codes.errRes(err, res))
}