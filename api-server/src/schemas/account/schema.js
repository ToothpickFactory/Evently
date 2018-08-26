const schema = {
	"id": "/Account",
	"type": "object",
	"properties": {
			"_id": {
				"type": "string"
			},
			"email": {
				"type": "string",
				"required": true,
				"format": "validateEmail",
				"minLength": 4,
				"maxLength": 25
			},
			"password": {
				"type": "string",
				"required": true,
				"minLength": 4,
				"maxLength": 25
			}
	}
}

module.exports = schema;