import { Component } from '@stencil/core';
import { EventClass } from '../../models/EventClass';
import flatpickr from 'flatpickr';

@Component({
	tag: 'event-form',
	styleUrl: 'event-form.scss',
	shadow: false
})
export class EventForm {
	async onSubmit(e) {
		e.preventDefault();
		const event = {
			title: e.target.elements.title.value,
			startTime: e.target.elements.startTime.value,
			maxSlots: e.target.elements.maxSlots.value
		}

		await EventClass.createEvent(event);
	}

	componentDidLoad() {
		flatpickr('[name=startTime]', {
			enableTime: true,
			dateFormat: "Y-m-d H:i"
		});
	}

	render() {
		return <form onSubmit={this.onSubmit}>
			<p>
				<label htmlFor="title">Title</label>
				<input type="text" name="title" id="title" />
			</p>

			<p>
				<label htmlFor="startTime">Start Time</label>
				<input type="datetime" name="startTime" id="startTime" />
			</p>

			<p>
				<label htmlFor="maxSlots">Max Slots</label>
				<input type="number" name="maxSlots" id="maxSlots" />
			</p>

			<button type="submit">Submit</button>
		</form>
	}
}
