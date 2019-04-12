import { Component } from '@stencil/core';
import { EventClass } from '../../models/EventClass';

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
			maxSlots: e.target.elements.maxSlots.value,
			owner: e.target.elements.owner.value
		}

		await EventClass.createEvent(event);
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

			<p>
				<label htmlFor="owner">Owner Name</label>
				<input type="text" name="owner" id="owner" />
			</p>

			<button type="submit">Submit</button>
		</form>
	}
}
