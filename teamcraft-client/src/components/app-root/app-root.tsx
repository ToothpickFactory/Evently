import { Component } from '@stencil/core';
import '@stencil/router';

@Component({
	tag: 'app-root',
	styleUrl: 'app-root.scss',
	shadow: false
})
export class AppRoot {
	// private eventId: string = 'DEz5pCU44';

	render() {
		return [
			<header>
				<h1 site-title>Teamcraft v0.0.1</h1>
			</header>,
			<main>
				<stencil-router>
					<stencil-route-switch>
						<stencil-route url="/" component="create-event-page" exact={true} />
						<stencil-route url="/e/:event_id" component="event-card" exact={true} />
					</stencil-route-switch>
				</stencil-router>
			</main>
		]
		// return <event-card eventId={this.eventId} />
	}
}
