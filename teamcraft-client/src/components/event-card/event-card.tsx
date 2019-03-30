import { Component, Prop, State } from '@stencil/core';
import { Evently } from '../../services/evently';
import { event, slot } from '../../interfaces/event.interface';

@Component({
  tag: 'event-card',
  styleUrl: 'event-card.scss',
  shadow: false
})
export class EventCard {
  @Prop() eventId: string;
  @State() event: event;
  private eventClass: Evently;

  async componentWillLoad() {
    await this.bootEvent();
  }

  componentDidUnload() {
    this.eventClass.unsubscribe(this.onEventUpdated);
  }

  async bootEvent() {
    this.eventClass = await Evently.getEvent(this.eventId);
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
    await this.eventClass.join({ name });
  }

  leave = async (slotId: string) => {
    await this.eventClass.leave(slotId);
  }

  render() {
    return [
      <header>
        <h1>{this.event.title}</h1>
        <date-time timestamp={this.event.startTime} />
        <count-down timestamp={this.event.startTime} />
      </header>,
      <main>
        <ul>
          {this.event.slots.map((slot: slot) => <li>
            <p>{slot.name}</p><button onClick={() => this.leave(slot.id)}>-</button>
          </li>
          )}
        </ul>
        <form onSubmit={this.join}>
          <input type="text" name="newSlot" />
          <button type="submit">+</button>
        </form>
      </main>
    ];
  }
}
