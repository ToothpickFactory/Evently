const _post = require("./_post");
const _get = require("./_get");

module.exports = function(app){
	_post(app);
	_get(app);
}