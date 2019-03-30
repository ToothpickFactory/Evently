const jwt = require('jsonwebtoken');
const AuthModule = require(appRoot + "/modules/auth");

async function setupAnonymous(res) {
	const uid = await AuthModule.createAnonymous();
	const token = AuthModule.signToken({ uid });
	res.set('Authorization', token);
	return token;
}

const authMiddle = async function (req, res, next) {
	const authorization = req.headers.authorization;
	const token = authorization || await setupAnonymous(res);

	try {
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		req.auth = decoded;
		next();
	} catch (err) {
		res.status(401).send('No.');
	}
}

module.exports = authMiddle;