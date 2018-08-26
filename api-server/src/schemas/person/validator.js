const Validator = require("jsonschema").Validator;
const PersonSchema = require("./schema");

const validator = new Validator();

const validate = function(person){
	return validator.validate(person, PersonSchema);
}

module.exports = validate;