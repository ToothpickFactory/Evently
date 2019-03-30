import { Component } from '@stencil/core';
import { Evently } from '../../services/evently';

@Component({
  tag: 'event-form',
  styleUrl: 'event-form.css',
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

    const evently = await Evently.createEvent(event);
    console.log(evently);
  }

  render() {
    return [
      <h1>Event Form</h1>,
      <form onSubmit={this.onSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" />

        <label htmlFor="startTime">Start Time</label>
        <input type="datetime" name="startTime" id="startTime" />

        <label htmlFor="maxSlots">Max Slots</label>
        <input type="number" name="maxSlots" id="maxSlots" />

        <label htmlFor="owner">Owner Name</label>
        <input type="text" name="owner" id="owner" />

        <button type="submit">Submit</button>
      </form>
    ];
  }
}
