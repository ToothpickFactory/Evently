import { NextFunction, Response } from 'express';
import { RequestCustom } from '../types/RequestCustom';
import { User } from '../models/User/User';

export async function authUser(req: RequestCustom, res: Response, next: NextFunction) {
	try {
		let token = req.headers.authorization;
		if (token === 'null') token = null;
		const user: User = token ? User.validateToken(token) : await new User().save();
		if (!token) res.set('Authorization', user.getToken());
		req.user = user;
		next();
	} catch (err) {
		console.log(err);
		res.status(err.status).send(err.msg);
	}
}
