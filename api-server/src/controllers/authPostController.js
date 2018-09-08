const AuthModule = require(appRoot + "/modules/auth");
const codes = require(appRoot + '/modules/codes');

module.exports = (req, res) => {
	let email = req.body.email;
	let password = req.body.password;

	AuthModule.createAccount(email, password)
		.then(() => res.send())
		.catch(err => codes.errRes(err, res))
}