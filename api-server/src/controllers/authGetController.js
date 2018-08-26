const auth = require('basic-auth');
const AuthModule = require(appRoot + "/modules/auth");

module.exports = (req, res) => {
	let authData = auth(req);
	let email = authData.name;
	let password = authData.pass;
	AuthModule.credentialExchange(email, password)
		.then((token) => res.send(token))
		.catch(err => errRes(err, res));
}