import { slot } from './../../interfaces/slot.interface';
import { event } from './../../interfaces/event.interface';
import config from '../../config';

class EventlyJS {
  private headers: any;

  constructor(private baseUrl: string, private token: string) {
    this.headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": `Bearer ${this.token}`
    }
  }

  public createEvent = async (event: event): Promise<string> => {
    const response = await fetch(`${this.baseUrl}/events`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(event)
    });

    const { eventId } = await response.json();

    return eventId
  }

  public updateEvent = async (event: event): Promise<event> => {
    const response = await fetch(`${this.baseUrl}/events/${event._id}`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(event)
    });

    return await response.json();
  }

  public getEvents = async (): Promise<event[]> => {
    const response = await fetch(`${this.baseUrl}/events`, { headers: this.headers });
    return await response.json();
  }

  public getEvent = async (eventId: string): Promise<event> => {
    const response = await fetch(`${this.baseUrl}/events/${eventId}`, { headers: this.headers });
    return await response.json();
  }

  public removeEvent = async (eventId: string): Promise<void> => {
    await fetch(`${this.baseUrl}/events/${eventId}`, {
      method: "DELETE",
      headers: this.headers
    });
    return;
  }

  public addSlot = async (eventId: string, slot: slot): Promise<slot> => {
    const response = await fetch(`${this.baseUrl}/events/${eventId}/slots`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(slot)
    });

    return await response.json();
  }

  public removeSlot = async (eventId: string, slotId: string): Promise<void> => {
    await fetch(`${this.baseUrl}/events/${eventId}/slots/${slotId}`, {
      method: "DELETE",
      headers: this.headers
    });

    return;
  }
}

export const evently = new EventlyJS(config.baseUrl, config.token);
