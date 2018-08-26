const appRootDir = require('app-root-dir').get();
const errRes = require(appRootDir + "/src/util/errRes");
const AuthModule = require(appRootDir + "/src/modules/auth");

// Routes
module.exports = (app) => {
	app.post('/auth', (req, res) => {
			let email = req.body.email;
			let password = req.body.password;
		
			AuthModule.createAccount(email, password)
				.then(() => res.send())
				.catch(err => {
					let msg = err.code === 11000 ? 'Account Already Exists': 'Something bad has happened';
					errRes(msg, res)
				})
	});
};
