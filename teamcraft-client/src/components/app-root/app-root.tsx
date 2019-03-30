import { Component } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false
})
export class AppRoot {
  private eventId: string = '1iiDzkwtq';

  render() {
    return <event-card eventId={this.eventId} />
  }
}
