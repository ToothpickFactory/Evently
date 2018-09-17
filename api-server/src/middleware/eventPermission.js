const EventsModule = require(appRoot + "/modules/events");
const codes = require(appRoot + '/modules/codes');

const eventPermission = async function (req, res, next) {
	const clientId = req.auth.clientId;
	const eventId = req.params.id;

	try {
		req.event = await EventsModule.getEvent(eventId, clientId);
		next();
	} catch (err) {
		codes.errRes(err, res);
	}
}

module.exports = eventPermission;