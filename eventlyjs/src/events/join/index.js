const rp = require('request-promise-native');

module.exports = function (config) {
	function join (id, participant) {
		let options = {
			method: 'POST',
			uri: `${config.url}/events/${id}/participants`,
			headers: {
				Authorization: 'Bearer ' + config.token
			},
			body: participant,
			json: true
		}
	
		return rp(options);
	};

	return join;
};
