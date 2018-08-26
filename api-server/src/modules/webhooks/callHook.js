const request = require('request');
const getEvents = require('../events/getEvents');
 
module.exports = function(action, event){
	let options = {
		uri: event.webhook,
		method: 'POST',
		json: {
			action,
			event
		}
	};

	request(options, () => {});
}

	