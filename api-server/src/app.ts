import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import EventController from './controllers/EventController';
import { loadEvent } from './middleware/loadEvent';
import { authUser } from './middleware/authUser';
import { rightsCheck } from './middleware/rightsCheck';
const version = process.env.npm_package_version;

const app: express.Application = express();

app.use(express.json());
app.use(cors({ exposedHeaders: 'Authorization' }));
app.use(express.static(path.join(__dirname, '../static')));

app.get('/', (_req: Request, res: Response) => res.send(`Welcome to Teamcraft API version ${version}!`));
app.get('/events', EventController.getEvents);
app.post('/events', authUser, EventController.createEvent);
app.get('/events/:event_id', loadEvent, EventController.getEvent);
app.put('/events/:event_id', loadEvent, authUser, rightsCheck, EventController.updateEvent);
app.delete('/events/:event_id', loadEvent, authUser, rightsCheck, EventController.removeEvent);
app.post('/events/:event_id/party', loadEvent, authUser, EventController.joinEvent);
app.delete('/events/:event_id/party/:member_id', loadEvent, authUser, rightsCheck, EventController.leaveEvent);

export default app;
