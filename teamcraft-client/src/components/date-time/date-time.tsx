import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'date-time',
	styleUrl: 'date-time.scss',
	shadow: false
})
export class DateTime {
	@Prop() timestamp: Date;
	private time: string;

	componentWillLoad() {
		const options = {
			year: '2-digit',
			month: 'numeric',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			timeZoneName: "short"
		}
		this.time = new Date(this.timestamp).toLocaleString("en-US", options)
	}

	render() {
		return this.time
	}
}
