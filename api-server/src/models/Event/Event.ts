import EventEmitter from 'events';
import shortid from 'shortid';
import { IEvent, IMember } from 'IEvent';
import { QueryDocumentSnapshot, CollectionReference, QuerySnapshot, DocumentSnapshot } from '@google-cloud/firestore';
import { db } from './../../config/firebase';
import { eventNotFound, serverError, validationError, idConflictError } from './../Codes/Codes';
import EventValidator from './Event.schema';
import MemberValidator from './Member.schema';

export const EVENT_UPDATED = 'EVENT_UPDATED';

const emitter = new EventEmitter();

export class EventClass {
	public static emitter = emitter;

	public static eventValidate(event: IEvent) {
		return EventValidator(event);
	}

	public static memberValidate(member: IMember) {
		return MemberValidator(member);
	}

	public static async getEvents(): Promise<EventClass[]> {
		const queryRef: CollectionReference = db.collection('events');

		try {
			const eventsRef: QuerySnapshot = await queryRef.get();
			const events: EventClass[] = [];
			eventsRef.forEach((event: QueryDocumentSnapshot) => events.push(new EventClass(event.data() as IEvent)));
			return events;
		} catch (err) {
			throw serverError(err);
		}
	}

	public static async getEvent(id: string): Promise<EventClass> {
		try {
			const eventDoc: DocumentSnapshot = await db.collection('events').doc(id).get();
			if (!eventDoc.exists) throw eventNotFound(id);
			return new EventClass(eventDoc.data() as IEvent);
		} catch (err) {
			throw err.status ? err : serverError(err);
		}
	}

	public event_id: IEvent['event_id'];
	public title: IEvent['title'];
	public owner_id: IEvent['owner_id'];
	public party: IEvent['party'] = [];
	public tags: IEvent['tags'] = [];
	public max_party: IEvent['max_party'] = null;
	public start_time: IEvent['start_time'] = null;
	public webhook: IEvent['webhook'] = null;

	constructor(event: IEvent) {
		this.setValues(event);
	}

	public setValues(event: IEvent) {
		if (this.event_id && event.event_id !== this.event_id) throw idConflictError();

		Object.assign(this, event);
		const results = EventClass.eventValidate(this.toJSON());
		if (results.errors.length) throw validationError(results.errors.toString() + ' ' + JSON.stringify(event));
	}

	public async save(): Promise<void> {
		if (!this.event_id) this.event_id = shortid.generate();
		const event = this.toJSON();

		try {
			await db.collection('events').doc(event.event_id).set(event, { merge: true });
			emitter.emit(EVENT_UPDATED, this);
		} catch (err) {
			throw serverError(err);
		}
	}

	public async remove(): Promise<void> {
		try {
			await db.collection('events').doc(this.event_id).delete();
		} catch (err) {
			throw serverError(err);
		}
	}

	public async join(member: IMember): Promise<EventClass> {
		const results = EventClass.memberValidate(member);
		if (results.errors.length) throw validationError(results.errors.toString());
		try {
			if (!this.party.some((mem: IMember) => mem.user_id === member.user_id)) {
				this.party.push(member);
			}
			await this.save();
			return this;
		} catch (err) {
			throw serverError(err);
		}
	}

	public async leave(user_id: string): Promise<EventClass> {
		this.party = this.party.filter((member: IMember) => member.user_id !== user_id);
		try {
			await this.save();
			return this;
		} catch (err) {
			throw serverError(err);
		}
	}

	public toJSON(): IEvent {
		return {
			event_id: this.event_id,
			max_party: this.max_party,
			title: this.title,
			start_time: this.start_time,
			party: this.party,
			owner_id: this.owner_id,
			tags: this.tags,
			webhook: this.webhook
		};
	}
}
