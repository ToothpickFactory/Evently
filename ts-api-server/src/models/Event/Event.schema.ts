import { Validator } from 'jsonschema';
import { IEvent } from 'IEvent';
import { MemberSchema } from './Member.schema';

export const EventSchema = {
	id: '/Event',
	type: 'object',
	additionalProperties: false,
	required: [
		'title',
		'owner_id'
	],
	properties: {
		event_id: {
			type: 'string'
		},
		tags: {
			type: 'array',
			items: {
				type: 'string',
				minLength: 1,
				maxLength: 50
			}
		},
		title: {
			type: 'string',
			minLength: 4,
			maxLength: 50
		},
		max_party: {
			type: [
				'number',
				'null'
			],
			minimum: 1,
			maximum: 100
		},
		start_time: {
			type: [
				'number',
				'null'
			]
		},
		party: {
			type: 'array',
			items: {
				$ref: '/Party'
			}
		},
		owner_id: {
			type: 'string',
			minLength: 5,
			maxLength: 10
		},
		webhook: {
			type: [
				'string',
				'null'
			],
			maxLength: 50
		}
	}
};

const eventValidator = new Validator();
eventValidator.addSchema(MemberSchema, '/Member');

export default (event: IEvent) => {
	return eventValidator.validate(event, EventSchema);
};
