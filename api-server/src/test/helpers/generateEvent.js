const composeEvent = require("./composeEvent");
const createEvent = require('../../modules/events/createEvent');

function generateEvent(fields){
	let event = composeEvent(fields);
	return createEvent(event);
}
			
module.exports = generateEvent;