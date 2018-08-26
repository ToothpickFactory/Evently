const AuthModule = require(appRoot + "/modules/auth");

module.exports = (req, res) => {
	let email = req.body.email;
	let password = req.body.password;

	AuthModule.createAccount(email, password)
		.then(() => res.send())
		.catch(err => {
			let msg = err.code === 11000 ? 'Account Already Exists' : 'Something bad has happened';
			errRes(msg, res)
		})
}