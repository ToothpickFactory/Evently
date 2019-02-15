import { Component } from '@stencil/core';
import { evently } from '../../services/evently';
import { event } from '../../interfaces/event.interface';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false
})
export class AppRoot {
  private event: event;
  async componentWillLoad() {
    this.event = await evently.getEvent('1iiDzkwtq');
  }
  render() {
    return <event-card event={this.event} />
  }
}
