export interface slot {
  id?: string
  name: string;
}

export interface event {
  event_id?: string;
  maxSlots: number;
  title: string;
  startTime: number;
  party?: slot[];
  owner: slot;
  tags?: string[];
  webhook?: string;
}
