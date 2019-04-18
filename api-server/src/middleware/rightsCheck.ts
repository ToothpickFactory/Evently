import { NextFunction, Response } from 'express';
import { RequestCustom } from '../types/RequestCustom';
import { forbidden } from './../models/Codes/Codes';

export async function rightsCheck(req: RequestCustom, res: Response, next: NextFunction) {
	const user = req.user;
	const event = req.event;
	const member_id = req.params.member_id;
	if (
		(member_id && member_id === user.user_id) ||
		user.user_id === event.owner_id
	) {
		next();
	} else {
		const err = forbidden();
		res.status(err.status).send(err.msg);
	}
}
