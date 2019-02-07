import { Component } from '@stencil/core';
import { evently } from './../../services/evently';
import { event } from './../../interfaces/event.interface';


@Component({
  tag: 'event-form',
  styleUrl: 'event-form.css'
})
export class EventForm {
  private history: HTMLIonRouterElement;

  private event: event = {
    maxSlots: null,
    title: null,
    startTime: null,
    owner: null
  }

  private async createEvent(e): Promise<void> {
    e.preventDefault();

    const title = (document.getElementById('title') as any).value;
    this.event.title = title;

    const startTime = (document.getElementById('startTime') as any).value;
    this.event.startTime = (new Date(startTime)).getTime();

    const maxSlots = (document.getElementById('maxSlots') as any).value;
    this.event.maxSlots = Number(maxSlots);

    const owner = (document.getElementById('owner') as any).value;
    this.event.owner = owner;

    const eventId = await evently.createEvent(this.event);

    this.history.push(`/events/${eventId}`);

    const event = await evently.getEvent(eventId);
    console.log(event);
  }

  componentWillLoad() {
    this.history = document.querySelector("ion-router");
  }

  render() {
    evently.getEvents().then(events => console.log(events))
    return (
      <form onSubmit={(e) => this.createEvent(e)}>
        <ion-item>
          <ion-label position="floating">Title</ion-label>
          <ion-input type="text" id="title"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Start Date</ion-label>
          <ion-datetime id="startTime" display-format="MMM DD, YYYY HH:mm"></ion-datetime>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Max Slots</ion-label>
          <ion-input type="number" id="maxSlots"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Owner Name</ion-label>
          <ion-input type="text" id="owner"></ion-input>
        </ion-item>
        <ion-button color="success" expand="block" fill="solid" type="submit">SUBMIT</ion-button>
      </form >
    );
  }
}
