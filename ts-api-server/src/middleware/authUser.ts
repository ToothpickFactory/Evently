import { NextFunction, Response } from 'express';
import { RequestCustom } from '../types/RequestCustom';
import { User } from '../models/User/User';

export async function authUser(req: RequestCustom, res: Response, next: NextFunction) {
	try {
		const token = req.headers.authorization;
		const user: User = token ? User.validateToken(token) : await new User().save();
		if (!token) res.set('Authorization', user.getToken());
		req.user = user;
		next();
	} catch (err) {
		res.status(err.status).send(err.msg);
	}
}
