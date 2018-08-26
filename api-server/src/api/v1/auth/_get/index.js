const appRootDir = require('app-root-dir').get();
const errRes = require(appRootDir + "/src/util/errRes");
const AuthModule = require(appRootDir + "/src/modules/auth");
const auth = require('basic-auth')

// Routes
module.exports = (app) => {
	app.get('/auth', (req, res) => {
			let authData = auth(req);
			let email = authData.name;
			let password = authData.pass;
			AuthModule.credentialExchange(email, password)
				.then((token) => res.send(token))
				.catch(err => errRes(err, res));
	});
};
