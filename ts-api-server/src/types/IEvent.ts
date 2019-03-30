export interface IMember {
	user_id: string;
	name: string;
}

export interface IEvent {
	event_id?: string;
	title?: string;
	owner_id?: string;
	party?: IMember[];
	tags?: string[];
	max_party?: number | null;
	start_time?: number | null;
	webhook?: string | null;
}
