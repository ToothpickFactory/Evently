import { Request, Response } from 'express';
import { EventClass } from './../models/Event/Event';
import { IEvent, IMember } from 'IEvent';
import { RequestCustom } from '../types/RequestCustom';

export default class EventController {
	public static async createEvent(req: RequestCustom, res: Response): Promise<void> {
		try {
			req.body.owner_id = req.user.user_id;
			const event = new EventClass(req.body);
			await event.save();
			res.send(event.toJSON());
		} catch (err) {
			res.status(err.status).send(err.msg);
		}
	}

	public static async getEvent(req: RequestCustom, res: Response): Promise<void> {
		try {
			res.send(req.event.toJSON());
		} catch (err) {
			res.status(err.status).send(err.msg);
		}
	}

	public static async updateEvent(req: RequestCustom, res: Response): Promise<void> {
		try {
			const eventJSON: IEvent = req.body;
			req.event.setValues(eventJSON);
			await req.event.save();
			res.send(req.event.toJSON());
		} catch (err) {
			res.status(err.status).send(err.msg);
		}
	}

	public static async removeEvent(req: RequestCustom, res: Response): Promise<void> {
		try {
			await req.event.remove();
			res.sendStatus(200);
		} catch (err) {
			res.status(err.status).send(err.msg);
		}
	}

	public static async getEvents(_req: Request, res: Response): Promise<void> {
		try {
			const events: IEvent[] = (await EventClass.getEvents()).map((event) => event.toJSON());
			res.send(events);
		} catch (err) {
			res.status(err.status).send(err.msg);
		}
	}

	public static async joinEvent(req: RequestCustom, res: Response): Promise<void> {
		try {
			const member: IMember = req.body;
			member.user_id = req.user.user_id;
			await req.event.join(member);
			res.sendStatus(200);
		} catch (err) {
			res.status(err.status).send(err.msg);
		}
	}

	public static async leaveEvent(req: RequestCustom, res: Response): Promise<void> {
		try {
			const member_id: string = req.params.member_id;
			await req.event.leave(member_id);
			res.sendStatus(200);
		} catch (err) {
			res.status(err.status).send(err.msg);
		}
	}
}
