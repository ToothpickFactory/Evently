const core = require("../testData/core");
const removeByClientId = require('../../modules/events/removeByClientId');

function removeEventTests(clientId){
	return removeByClientId(clientId || core.clientIds.clientId1);
}

module.exports = removeEventTests