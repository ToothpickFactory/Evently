const jwt = require('jsonwebtoken');
const config = require("config");

const authMiddle = function (req, res, next) {
	
	try {
		let token = (req.headers.authorization).replace("Bearer ", "");
		let decoded = jwt.verify(token, config.jwt.key);
		req.auth = decoded;
		next();
	}
	catch(err) {
		res.status(401).send('No.');
	}

}

module.exports = authMiddle;