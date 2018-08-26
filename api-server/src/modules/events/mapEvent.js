const shortid = require('shortid');

function buildOwner (rawOwner) {
	return {
		id: rawOwner.id || rawOwner.name.toUpperCase(),
		name: rawOwner.name
	}
}


function mapEvent (rawEvent, id) {
	let event = {};
	
	event._id = id || shortid.generate();
	event.clientId = rawEvent.clientId;
	event.title = rawEvent.title;
	event.slots = rawEvent.slots || 10;
	event.startTime = rawEvent.startTime || Date.now() + 300000;
	event.participants = rawEvent.participants || [];
	event.tags = (rawEvent.tags || []).map(tag => tag.trim());
	event.webhook = rawEvent.webhook;
	event.owner = rawEvent.owner ? buildOwner(rawEvent.owner) : null
	
	return event;
}

module.exports = mapEvent;