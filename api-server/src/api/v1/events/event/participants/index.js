const _get = require("./_get");
const _post = require("./_post");
const _delete = require("./_delete");

module.exports = function(app){
	_get(app);
	_post(app);
	_delete(app);
}