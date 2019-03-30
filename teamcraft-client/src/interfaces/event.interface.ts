export interface slot {
  id?: string
  name: string;
}

export interface event {
  _id?: string;
  maxSlots: number;
  title: string;
  startTime: number;
  slots?: slot[];
  owner: slot;
  tags?: string[];
  webhook?: string;
}
