import { slot } from './slot.interface';

export interface event {
  _id?: string;
  clientId?: string;
  maxSlots: number;
  title: string;
  startTime: number;
  slots: slot[];
  owner: slot;
  tags: string[];
  webhook: string;
}
