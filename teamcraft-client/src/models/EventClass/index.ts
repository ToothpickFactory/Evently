import { IEvent, IMember } from 'IEvent';
import config from '../../config';
import { User, user } from './../UserClass/index';
import { ResourceFactory } from './../../decorators/ResourceFactory';
import { ResourcePubSub } from './../../decorators/ResourcePubSub';
import { ToJSON } from './../../decorators/ToJSON';

@ResourceFactory()
@ToJSON(['event_id', 'max_party', 'title', 'start_time', 'party', 'owner_id', 'tags', 'webhook'])
@ResourcePubSub
export class EventClass {
	private static baseUrl: string = config.baseUrl;

	private static get headers(): any {
		return {
			'Content-Type': 'application/json; charset=utf-8',
			'Authorization': `${user.token}`
		}
	}

	private static checkForToken(res: Response): void {
		const token: string = res.headers.get('Authorization');
		if (User.tokenTest(token)) user.token = token;
	}

	private static async fetch(method: string, urlStem: string, body?: any): Promise<IEvent[] | IEvent> {
		const res = await fetch(`${EventClass.baseUrl}${urlStem}`, {
			method,
			headers: EventClass.headers,
			body: body ? JSON.stringify(body) : null
		});

		if (!user.token) EventClass.checkForToken(res);
		if (res.status > 299) throw { status: res.status, msg: await res.text() };

		return await res.json();
	}

	private static eventSanitize(event: IEvent): void {
		event.max_party = +event.max_party;
	}

	public static async getEvents(): Promise<EventClass[]> {
		const events = await EventClass.fetch('GET', '/events') as IEvent[];
		return events.map((event: IEvent) => new EventClass(event));
	}

	public static async getEvent(id: string): Promise<EventClass> {
		const event = await EventClass.fetch('GET', `/events/${id}`) as IEvent;
		return new EventClass(event);
	}

	public static async createEvent(event: IEvent): Promise<EventClass> {
		EventClass.eventSanitize(event);
		const newEvent = await EventClass.fetch('POST', `/events`, event) as IEvent;
		return new EventClass(newEvent);
	}

	public event_id: IEvent['event_id'];
	public max_party: IEvent['max_party'];
	public title: IEvent['title'];
	public start_time: IEvent['start_time'];
	public party: IEvent['party'];
	public owner_id: IEvent['owner_id'];
	public tags: IEvent['tags'] = [];
	public webhook: IEvent['webhook'];
	public subscribe: Function;
	public unsubscribe: Function;
	public toJSON: () => IEvent;
	private socket: any;
	private publish: Function;

	constructor(event: IEvent) {
		this.syncEvent(event);
		this.createSocket();
	}

	private createSocket() {
		this.socket = (window as any).io(`${EventClass.baseUrl}?event_id=${this.event_id}`);
		this.socket.on('EVENT_UPDATED', (event: IEvent) => {
			this.syncEvent(event);
			this.publish();
		});
	}

	private syncEvent(event: IEvent): void {
		Object.assign(this, event);
	}

	public getSocket() {
		return this.socket || this.createSocket();
	};

	public async updateEvent(event: IEvent): Promise<EventClass> {
		const updatedEvent = await EventClass.fetch('PUT', `/events/${event.event_id}`, event) as IEvent;
		this.syncEvent(updatedEvent);
		return this;
	}

	public async removeEvent(): Promise<void> {
		await EventClass.fetch('DELETE', `/events/${this.event_id}`);
	}

	public async join(name: IMember['name']): Promise<EventClass> {
		const updatedEvent = await EventClass.fetch('POST', `/events/${this.event_id}/party`, { name }) as IEvent;
		this.syncEvent(updatedEvent);
		return this;
	}

	public async leave(slotId: string): Promise<EventClass> {
		const updatedEvent = await EventClass.fetch('DELETE', `/events/${this.event_id}/party/${slotId}`) as IEvent;
		this.syncEvent(updatedEvent);
		return this;
	}
}
