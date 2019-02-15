import { Component, Prop } from '@stencil/core';
import { event } from '../../interfaces/event.interface';
import { slot } from './../../interfaces/slot.interface';
import { evently } from '../../services/evently';

@Component({
  tag: 'event-card',
  styleUrl: 'event-card.scss',
  shadow: false
})
export class EventCard {
  @Prop() event: event;

  join = async (e) => {
    e.preventDefault();

    const name = e.target.elements.newSlot.value;
    const res = await evently.join(this.event._id, { name });
    console.log(res);
  }

  leave = async (slotId) => {
    const res = await evently.leave(this.event._id, slotId);
    console.log(res)
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
