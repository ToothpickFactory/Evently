const auth = require('basic-auth');
const AuthModule = require(appRoot + "/modules/auth");
const codes = require(appRoot + '/modules/codes');

module.exports = (req, res) => {
	let authData = auth(req);
	let email = authData.name;
	let password = authData.pass;
	AuthModule.credentialExchange(email, password)
		.then((token) => res.send(token))
		.catch(err => codes.errRes(err, res));
}