import { Validator } from 'jsonschema';
import { IMember } from 'IEvent';

export const MemberSchema = {
	id: '/Member',
	type: 'object',
	required: [
		'user_id',
		'name'
	],
	properties: {
		user_id: {
			type: 'string',
			minLength: 1,
			maxLength: 25
		},
		name: {
			type: 'string',
			minLength: 1,
			maxLength: 25
		}
	}
};

const memberValidator = new Validator();

export default (member: IMember) => {
	return memberValidator.validate(member, MemberSchema);
};
