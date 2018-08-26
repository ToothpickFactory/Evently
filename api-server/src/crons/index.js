const schedule = require('node-schedule');
const webhooks = require('../modules/webhooks');

function crons () {
	schedule.scheduleJob('*/1 * * * *', function(){
		webhooks.startingSoon();
	});
}

module.exports = crons;