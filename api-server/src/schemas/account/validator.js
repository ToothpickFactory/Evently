const Validator = require("jsonschema").Validator;
const AccountSchema = require("./schema");

Validator.prototype.customFormats.validateEmail = function(email) {
  let regex = /\S+@\S+\.\S+/;
	return regex.test(email);
};

const validator = new Validator();

const validate = function(account){
	return validator.validate(account, AccountSchema);
}

module.exports = validate;