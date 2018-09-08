const jwt = require('jsonwebtoken');
const config = require("config");

const authMiddle = function (req, res, next) {

	try {
		const token = (req.headers.authorization).replace("Bearer ", "");
		const decoded = jwt.verify(token, config.jwt.key);
		req.auth = decoded;
		next();
	} catch (err) {
		res.status(401).send('No.');
	}

}

module.exports = authMiddle;