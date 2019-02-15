import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'count-down',
  styleUrl: 'count-down.scss',
  shadow: false
})
export class CountDown {
  @Prop() timestamp: number;
  @State() time: string;

  private updateTime = () => {
    const now = Date.now();
    const diff = this.timestamp - now;
    const days = Math.floor(diff / 8.64e+7);
    const hours = Math.floor(diff / 3.6e+6) % 24;
    const minutes = Math.floor(diff / 60000) % 60;
    this.time = `D${days} H${hours} M${minutes}`;
  }

  componentWillLoad() {
    this.updateTime();
    setInterval(this.updateTime, 60000);
  }

  render() {
    return this.time
  }
}
