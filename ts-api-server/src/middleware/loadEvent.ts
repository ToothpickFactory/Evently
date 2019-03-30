
import { EventClass } from '../models/Event/Event';
import { RequestCustom } from '../types/RequestCustom';
import { NextFunction, Response } from 'express';
import { eventNotFound, malformedRequest } from './../models/Codes/Codes';

export async function loadEvent(req: RequestCustom, res: Response, next: NextFunction) {
	try {
		const event_id = req.params.event_id;
		if (!event_id) throw (malformedRequest);

		const event: EventClass = await EventClass.getEvent(event_id);
		if (!event) throw (eventNotFound);

		req.event = event;
		next();
	} catch (err) {
		res.status(err.status).send(err.msg);
	}
}
