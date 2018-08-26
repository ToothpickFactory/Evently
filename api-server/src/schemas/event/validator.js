const Validator = require("jsonschema").Validator;
const EventSchema = require("./schema");
const PersonSchema = require("../person/schema");

const validator = new Validator();
validator.addSchema(PersonSchema, "/Person");

const validate = function(event){
	return validator.validate(event, EventSchema);
}

module.exports = validate;