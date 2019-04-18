import { IEvent, IMember } from 'IEvent';
import config from '../../config';

export class EventClass {
	private static baseUrl: string = config.baseUrl;

	private static token: string = (() => {
		const tokenTest = RegExp(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
		const token = localStorage.getItem('token');
		return tokenTest.test(token) ? token : '';
	})();

	private static headers: any = {
		'Content-Type': 'application/json; charset=utf-8',
		'Authorization': `${EventClass.token}`
	}

	private static checkForToken(res: Response): void {
		const token: string = res.headers.get('Authorization');
		localStorage.setItem('token', token);
		EventClass.token = token;
	}

	private static async fetch(method: string, urlStem: string, body?: any): Promise<IEvent[] | IEvent> {
		const res = await fetch(`${EventClass.baseUrl}${urlStem}`, {
			method,
			headers: EventClass.headers,
			body: body ? JSON.stringify(body) : null
		});

		if (!EventClass.token) EventClass.checkForToken(res);
		if (res.status > 299) throw { status: res.status, msg: await res.text() };

		return await res.json();
	}

	private static eventSanitize(event: IEvent): void {
		event.max_party = +event.max_party;
		event.start_time = +event.start_time;
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
	private socket: any;
	private subscribers: Array<Function> = [];

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

	private publish() {
		this.subscribers.forEach(sub => sub(this))
	}

	public subscribe(sub: Function): void {
		this.subscribers.push(sub);
	}

	public unsubscribe(sub: Function): void {
		this.subscribers = this.subscribers.filter(_sub => _sub !== sub);
	}

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

	public toJSON(): IEvent {
		return {
			event_id: this.event_id,
			max_party: this.max_party,
			title: this.title,
			start_time: this.start_time,
			party: this.party,
			owner_id: this.owner_id,
			tags: this.tags,
			webhook: this.webhook
		}
	}
}
