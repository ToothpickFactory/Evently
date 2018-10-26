const jwt		= require('jsonwebtoken');
const events 	= require('./events');

export function init (config) {
	let decoded = jwt.decode(config.token);
	let _config = Object.assign({}, config, {client_id: decoded._id});
	return {
		events: events(_config)
	}
}