const jwt = require("jsonwebtoken");

const signToken = function (payload) {
	return jwt.sign(payload, process.env.JWT_KEY, {
		noTimestamp: true
	});
}

module.exports = signToken;