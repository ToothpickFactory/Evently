const EventsModule = require(appRoot + "/modules/events");

module.exports = (req, res) => {
	let id = req.params.id;
	let clientId = req.auth._id;
	EventsModule.deleteEvent(id, clientId)
		.then(() => res.send())
		.catch(err => {
			errRes(err, res)
		})
}