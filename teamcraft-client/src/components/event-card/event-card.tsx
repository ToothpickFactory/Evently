import { Component, Prop, State } from '@stencil/core';
import { EventClass } from '../../models/EventClass';
import { IEvent, IMember } from 'IEvent';
import { user, User } from '../../models/UserClass';

@Component({
	tag: 'event-card',
	styleUrl: 'event-card.scss',
	shadow: false
})
export class EventCard {
	@Prop() eventId: string;
	@State() event: IEvent;
	private eventClass: EventClass;
	private user: User = user;

	async componentWillLoad() {
		await this.bootEvent();
	}

	componentDidUnload() {
		this.eventClass.unsubscribe(this.onEventUpdated);
	}

	async bootEvent() {
		this.eventClass = await EventClass.getEvent(this.eventId);
		this.event = this.eventClass.toJSON();
		this.eventClass.subscribe(this.onEventUpdated);
	}

	private onEventUpdated = () => {
		this.event = { ...this.eventClass.toJSON() };
	}

	join = async (e) => {
		e.preventDefault();
		const name = e.target.elements.newSlot.value;
		e.target.reset();
		await this.eventClass.join(name);
	}

	leave = async (slotId: string) => {
		await this.eventClass.leave(slotId);
	}

	render() {
		return [
			<header>
				<h1>{this.event.title}</h1>
				<date-time timestamp={this.event.start_time} />
				<count-down timestamp={this.event.start_time} />
			</header>,
			<main>
				<ul>
					{this.event.party.map((member: IMember) => <li>
						<p>{member.name}</p>
						{
							(this.user.user_id === member.user_id || this.user.user_id === this.event.owner_id) &&
							<button onClick={() => this.leave(member.user_id)}>-</button>}
					</li>
					)}
				</ul>
				{
					!this.event.party.some(member => member.user_id === this.user.user_id) &&
					<form onSubmit={this.join}>
						<input type="text" name="newSlot" />
						<button type="submit">+</button>
					</form>
				}

			</main>
		];
	}
}
