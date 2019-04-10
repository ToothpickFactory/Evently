import { ICode } from 'ICode';

export const invalidToken = (): ICode => {
	return { status: 401, msg: 'Invalid token' };
};

export const credentialsRequired = (): ICode => {
	return { status: 401, msg: 'username and password are required' };
};

export const emailTaken = (): ICode => {
	return { status: 400, msg: 'Email address is taken' };
};

export const eventNotFound = (id: string): ICode => {
	return { status: 404, msg: `Event by ${id} can not be found` };
};

export const forbidden = (): ICode => {
	return { status: 403, msg: 'Forbidden' };
};

export const malformedRequest = (err: string): ICode => {
	return { status: 422, msg: err };
};

export const notInEvent = (): ICode => {
	return { status: 404, msg: 'Event not found or User may not be apart of this event' };
};

export const serverError = (err: string): ICode => {
	console.error(err);
	return { status: 500, msg: 'Crap... I broke something...' };
};

export const userInEvent = (): ICode => {
	return { status: 404, msg: 'Event not found or User may already be apart of this event' };
};

export const userNotFound = (): ICode => {
	return { status: 401, msg: 'Can not find user with the provided credentials' };
};

export const validationError = (err: string): ICode => {
	return { status: 422, msg: err };
};

export const idConflictError = (): ICode => {
	return { status: 422, msg: 'Can not change the ID of an event' };
};
