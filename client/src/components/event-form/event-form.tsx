import { Component } from '@stencil/core';

@Component({
  tag: 'event-form',
  styleUrl: 'event-form.css'
})
export class EventForm {

  render() {
    return (
      <form>
        <ion-item>
          <ion-label position="floating">Title</ion-label>
          <ion-input type="text"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Start Date</ion-label>
          <ion-datetime display-format="MMM DD, YYYY HH:mm"></ion-datetime>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Max Slots</ion-label>
          <ion-input type="number"></ion-input>
        </ion-item>
        <ion-button color="success" expand="block" fill="solid">SUBMIT</ion-button>
      </form >
    );
  }
}
