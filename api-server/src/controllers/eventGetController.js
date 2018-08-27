const EventsModule = require(appRoot + "/modules/events");
const codes = require(appRoot + '/modules/codes');

module.exports = (req, res) => {
	let id = req.params.id;
	let clientId = req.auth._id;
	EventsModule.getEvent(id, clientId)
		.then(event => res.send(event))
		.catch(err => codes.errRes(err, res))
}