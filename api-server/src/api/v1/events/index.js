const appRootDir = require('app-root-dir').get();
const AuthMiddle = require(appRootDir + "/src/middleware/authMiddle");

const event = require("./event");
const _get = require("./_get");
const _post = require("./_post");

module.exports = function(app){
	app.use('/events', AuthMiddle);
	event(app);
	_get(app);
	_post(app);
}