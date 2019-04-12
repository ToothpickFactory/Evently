import { Component } from '@stencil/core';

@Component({
	tag: 'create-event-page',
	styleUrl: 'create-event-page.scss',
	shadow: false
})
export class CreateEventPage {
	render() {
		return <event-form></event-form>
	}
}
