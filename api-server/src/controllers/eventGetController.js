const EventsModule = require(appRoot + "/modules/events");

module.exports = (req, res) => {
	let id = req.params.id;
	let clientId = req.auth._id;
	EventsModule.getEvent(id, clientId)
		.then(event => res.send(event))
		.catch(err => errRes(err, res))
}