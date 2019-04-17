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
		const btn = e.target.elements.submit_btn;
		btn.disabled = true;

		const event = {
			title: e.target.elements.title.value,
			start_time: new Date(e.target.elements.start_time.value).getTime(),
			max_party: e.target.elements.max_party.value
		}

		e.target.reset();
		const newEvent = await EventClass.createEvent(event);
		btn.disabled = false;
		window.location.assign(`/e/${newEvent.event_id}`);
	}

	componentDidLoad() {
		flatpickr('[name=start_time]', {
			enableTime: true,
			dateFormat: "Y-m-d H:i"
		});
	}

	render() {
		return <form onSubmit={(e) => this.onSubmit(e)}>
			<p>
				<label htmlFor="title">Title</label>
				<input type="text" name="title" id="title" />
			</p>

			<p>
				<label htmlFor="start_time">Start Time</label>
				<input type="datetime" name="start_time" id="start_time" />
			</p>

			<p>
				<label htmlFor="max_party">Max Slots</label>
				<input type="number" name="max_party" id="max_party" />
			</p>

			<button type="submit" name="submit_btn">Submit</button>
		</form>
	}
}
