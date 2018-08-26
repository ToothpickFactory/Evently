const getEvents = require('../events/getEvents');
const callHook = require('./callHook');
 
module.exports = function(){
	let query = {
		rangeStart: Date.now(),
		rangeEnd: Date.now() + 300000
	}

	getEvents(query).then(events => {
		events.forEach(event => {
				callHook("STARTING_SOON", event);
		});
	});
}

	