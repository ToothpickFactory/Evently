const schema = {
	"id": "/Person",
	"type": "object",
	"properties": {
		"id": {
			"type": "string",
			"required": true,
			"minLength": 1,
			"maxLength": 25
		},
		"name": {
			"type": "string",
			"required": true,
			"minLength": 1,
			"maxLength": 25
		}
	}
}

module.exports = schema;