import { Component, Prop, State } from '@stencil/core';
import { evently } from './../../services/evently';
import { event } from './../../interfaces/event.interface';


@Component({
  tag: 'event-page',
  styleUrl: 'event-page.css'
})
export class EventPage {
  @Prop() eventId: string;
  @State() event: event;

  async componentWillLoad() {
    this.event = await evently.getEvent(this.eventId);
    console.log(this.event);
  }

  render() {
    return (<pre>{JSON.stringify(this.event, null, '\t')}</pre>);
  }
}
