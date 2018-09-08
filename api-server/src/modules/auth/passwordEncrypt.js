const crypto = require("crypto");

function passwordEncrypt(password) {
	return crypto.createHash("SHA1").update(password).digest("hex");
}

module.exports = passwordEncrypt;