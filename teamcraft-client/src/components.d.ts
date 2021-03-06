/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';

import '@stencil/router';
import '@stencil/state-tunnel';
import {
  MatchResults,
} from '@stencil/router';


export namespace Components {

  interface AppRoot {}
  interface AppRootAttributes extends StencilHTMLAttributes {}

  interface CountDown {
    'timestamp': Date;
  }
  interface CountDownAttributes extends StencilHTMLAttributes {
    'timestamp'?: Date;
  }

  interface CreateEventPage {}
  interface CreateEventPageAttributes extends StencilHTMLAttributes {}

  interface DateTime {
    'timestamp': Date;
  }
  interface DateTimeAttributes extends StencilHTMLAttributes {
    'timestamp'?: Date;
  }

  interface EventCard {
    'eventId': string;
  }
  interface EventCardAttributes extends StencilHTMLAttributes {
    'eventId'?: string;
  }

  interface EventForm {}
  interface EventFormAttributes extends StencilHTMLAttributes {}

  interface EventPage {
    'match': MatchResults;
  }
  interface EventPageAttributes extends StencilHTMLAttributes {
    'match'?: MatchResults;
  }
}

declare global {
  interface StencilElementInterfaces {
    'AppRoot': Components.AppRoot;
    'CountDown': Components.CountDown;
    'CreateEventPage': Components.CreateEventPage;
    'DateTime': Components.DateTime;
    'EventCard': Components.EventCard;
    'EventForm': Components.EventForm;
    'EventPage': Components.EventPage;
  }

  interface StencilIntrinsicElements {
    'app-root': Components.AppRootAttributes;
    'count-down': Components.CountDownAttributes;
    'create-event-page': Components.CreateEventPageAttributes;
    'date-time': Components.DateTimeAttributes;
    'event-card': Components.EventCardAttributes;
    'event-form': Components.EventFormAttributes;
    'event-page': Components.EventPageAttributes;
  }


  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLCountDownElement extends Components.CountDown, HTMLStencilElement {}
  var HTMLCountDownElement: {
    prototype: HTMLCountDownElement;
    new (): HTMLCountDownElement;
  };

  interface HTMLCreateEventPageElement extends Components.CreateEventPage, HTMLStencilElement {}
  var HTMLCreateEventPageElement: {
    prototype: HTMLCreateEventPageElement;
    new (): HTMLCreateEventPageElement;
  };

  interface HTMLDateTimeElement extends Components.DateTime, HTMLStencilElement {}
  var HTMLDateTimeElement: {
    prototype: HTMLDateTimeElement;
    new (): HTMLDateTimeElement;
  };

  interface HTMLEventCardElement extends Components.EventCard, HTMLStencilElement {}
  var HTMLEventCardElement: {
    prototype: HTMLEventCardElement;
    new (): HTMLEventCardElement;
  };

  interface HTMLEventFormElement extends Components.EventForm, HTMLStencilElement {}
  var HTMLEventFormElement: {
    prototype: HTMLEventFormElement;
    new (): HTMLEventFormElement;
  };

  interface HTMLEventPageElement extends Components.EventPage, HTMLStencilElement {}
  var HTMLEventPageElement: {
    prototype: HTMLEventPageElement;
    new (): HTMLEventPageElement;
  };

  interface HTMLElementTagNameMap {
    'app-root': HTMLAppRootElement
    'count-down': HTMLCountDownElement
    'create-event-page': HTMLCreateEventPageElement
    'date-time': HTMLDateTimeElement
    'event-card': HTMLEventCardElement
    'event-form': HTMLEventFormElement
    'event-page': HTMLEventPageElement
  }

  interface ElementTagNameMap {
    'app-root': HTMLAppRootElement;
    'count-down': HTMLCountDownElement;
    'create-event-page': HTMLCreateEventPageElement;
    'date-time': HTMLDateTimeElement;
    'event-card': HTMLEventCardElement;
    'event-form': HTMLEventFormElement;
    'event-page': HTMLEventPageElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
