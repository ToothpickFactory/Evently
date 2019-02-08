import { Component } from '@stencil/core';

@Component({
  tag: 'event-card',
  styleUrl: 'event-card.scss',
  shadow: false
})
export class EventCard {
  render() {
    return [
      <header>
        <h1>Dreaming City</h1>
        <h3>Sep 30 8:15PM MST</h3>
        <h3>2D 5H 15M</h3>
      </header>,
      <main>
        <ul>
          <li><p>Felix</p><button>-</button></li>
          <li><p>Riot</p><button>-</button></li>
          <li><p>Acurite</p><button>-</button></li>
          <li><p>Zaltan</p><button>-</button></li>
        </ul>
        <form>
          <input type="text" name="newSlot" />
          <button type="submit">+</button>
        </form>
      </main>
    ];
  }
}
