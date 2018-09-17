const EventsModule = require(appRoot + "/modules/events");
const codes = require(appRoot + '/modules/codes');

module.exports = (req, res) => {
	let clientId = req.auth.clientId;
	EventsModule.createEvent(req.body, clientId)
		.then(newEvent => res.send(newEvent))
		.catch(err => codes.errRes(err, res))
}