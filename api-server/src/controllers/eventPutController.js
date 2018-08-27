const EventsModule = require(appRoot + "/modules/events");
const codes = require(appRoot + '/modules/codes');

module.exports = (req, res) => {
	let id = req.params.id;
	let clientId = req.auth._id;
	EventsModule.updateEvent(id, req.body, clientId)
		.then(newEvent => res.send(newEvent))
		.catch(err => codes.errRes(err, res))
}