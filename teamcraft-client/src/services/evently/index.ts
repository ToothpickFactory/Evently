import { event, slot } from '../../interfaces/event.interface';
import config from '../../config';

export class Evently {
  private static baseUrl: string = config.baseUrl;

  private static token: string = localStorage.getItem('token') || '';

  private static headers: any = {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': `${Evently.token}`
  }

  private static checkForToken = (res: Response): void => {
    const token: string = res.headers.get('Authorization');
    localStorage.setItem('token', token);
    Evently.token = token;
  }

  private static fetch = async (method: string, urlStem: string, body?: any): Promise<event[] | event> => {
    const res = await fetch(`${Evently.baseUrl}${urlStem}`, {
      method,
      headers: Evently.headers,
      body: body ? JSON.stringify(body) : null
    });

    if (!Evently.token) Evently.checkForToken(res);

    return await res.json();
  }

  private static eventSanitize(event: event): void {
    event.maxSlots = +event.maxSlots;
    event.startTime = +event.startTime;
  }

  public static getEvents = async (): Promise<Evently[]> => {
    const events = await Evently.fetch('GET', '/events') as event[];
    return events.map((event: event) => new Evently(event));
  }

  public static getEvent = async (id: string): Promise<Evently> => {
    const event = await Evently.fetch('GET', `/events/${id}`) as event;
    return new Evently(event);
  }

  public static createEvent = async (event: event): Promise<Evently> => {
    Evently.eventSanitize(event);
    const newEvent = await Evently.fetch('POST', `/events`, event) as event;
    return new Evently(newEvent);
  }

  public _id: event['_id'];
  public maxSlots: event['maxSlots'];
  public title: event['title'];
  public startTime: event['startTime'];
  public slots: event['slots'];
  public owner: event['owner'];
  public tags: event['tags'] = [];
  public webhook: event['webhook'];
  private socket: any;
  private subscribers: Array<Function> = [];

  constructor(event: event) {
    this.syncEvent(event);
    this.createSocket();
  }

  private createSocket = () => {
    this.socket = (window as any).io(`${Evently.baseUrl}?event_id=${this._id}`);
    this.socket.on('EVENT_UPDATED', (event: event) => {
      this.syncEvent(event);
      this.publish();
    });
  }

  private syncEvent = (event: event): void => {
    Object.assign(this, event);
  }

  public getSocket = () => this.socket || this.createSocket();

  private publish = () => {
    this.subscribers.forEach(sub => sub(this))
  }

  public subscribe = (sub: Function): void => {
    this.subscribers.push(sub);
  }

  public unsubscribe = (sub: Function): void => {
    this.subscribers = this.subscribers.filter(_sub => _sub !== sub);
  }

  public updateEvent = async (event: event): Promise<Evently> => {
    const updatedEvent = await Evently.fetch('PUT', `/events/${event._id}`, event) as event;
    this.syncEvent(updatedEvent);
    return this;
  }

  public removeEvent = async (): Promise<void> => {
    await Evently.fetch('DELETE', `/events/${this._id}`);
  }

  public join = async (slot: slot): Promise<Evently> => {
    const updatedEvent = await Evently.fetch('POST', `/events/${this._id}/slots`, slot) as event;
    this.syncEvent(updatedEvent);
    return this;
  }

  public leave = async (slotId: string): Promise<Evently> => {
    const updatedEvent = await Evently.fetch('DELETE', `/events/${this._id}/slots/${slotId}`) as event;
    this.syncEvent(updatedEvent);
    return this;
  }

  public toJSON = (): event => {
    return {
      _id: this._id,
      maxSlots: this.maxSlots,
      title: this.title,
      startTime: this.startTime,
      slots: this.slots,
      owner: this.owner,
      tags: this.tags,
      webhook: this.webhook
    }
  }
}
