import { Component, Prop } from '@stencil/core';
import { MatchResults } from '@stencil/router';

@Component({
	tag: 'event-page',
	styleUrl: 'event-page.scss',
	shadow: false
})
export class EventPage {
	@Prop() match: MatchResults;

	render() {
		return <event-card eventId={this.match.params.event_id} />
	}
}
