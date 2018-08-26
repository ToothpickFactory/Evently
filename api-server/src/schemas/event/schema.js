const schema = {
	"id": "/Event",
	"type": "object",
	"properties": {
			"_id": {
				"type": "string"
			},
			"client_id": {
				"type": "string"
			},
			"tags": {
				"type": "array",
				"items": {
					"type": "string",
					"minLength": 1,
					"maxLength": 50
				}
			},
			"title": {
				"type": "string",
				"required": true,
				"minLength": 4,
				"maxLength": 50
			},
			"slots": {
				"type": "number",
				"required": true,
				"minimum": 1,
				"maximum": 100
			},
			"startTime": {
				"type": "number",
				"required": true
			},
			"participants": {
				"type": "array",
				"items": {
					"$ref": "/Person",
				}
			},
			"owner": {
				"required": true,
				"$ref": "/Person"
			},
			"webhoook": {
				"type": "string",
				"minLength": 1,
				"maxLength": 50
			}
	}
}

module.exports = schema;