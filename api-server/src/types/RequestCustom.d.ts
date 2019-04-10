import { EventClass } from '../models/Event/Event';
import { Request } from 'express';
import { User } from './../models/User/User';

export interface RequestCustom extends Request {
	event?: EventClass;
	user?: User;
}