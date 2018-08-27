const EventsModule = require(appRoot + "/modules/events");
const codes = require(appRoot + '/modules/codes');

module.exports = (req, res) => {
	let id = req.params.id;
	let clientId = req.auth._id;
	EventsModule.deleteEvent(id, clientId)
		.then(() => res.send())
		.catch(err => {
			codes.errRes(err, res)
		})
}