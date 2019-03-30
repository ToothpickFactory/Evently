const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;
const chaiHttp = require('chai-http');
const testData = require("../test-data.js");
const removeEventsByClientId = require(appRoot + "/modules/events/removeEventsByClientId");
const getTestAccount = require('../helpers/getTestAccount');

chai.should();
chai.use(chaiAsPromised);
chai.use(chaiHttp);

describe('Events', function () {
	let token, account, eventId, event;
	before(async () => [token, account] = await getTestAccount());
	after(async () => await removeEventsByClientId(account.clientId));

	describe('#CREATE /events', function () {
		it('should return a new event', async () => {
			const event = testData.event(account.clientId);
			const res = await chai.request(testData.url)
				.post(`/events`)
				.set('Authorization', 'Bearer ' + token)
				.send(event);

			eventId = res.body.eventId;
			expect(res.body).to.have.property("eventId");
		});
	});

	describe('#GET /events', function () {
		it('should return a list of events', async () => {
			const res = await chai.request(testData.url)
				.get(`/events`)
				.set('Authorization', 'Bearer ' + token);

			expect(res.body).to.be.an("array");
		});
	});

	describe('#GET /event/:eventId', function () {
		it('should return a single event', async () => {
			const res = await chai.request(testData.url)
				.get(`/events/${eventId}`)
				.set('Authorization', 'Bearer ' + token);

			event = res.body;
			expect(res.body).to.have.property("_id");
		});
	});

	describe('#PUT /event/:eventId', function () {
		it('should update event name', async () => {
			const newTitle = "Mr McTesty";
			event.title = newTitle;

			const res = await chai.request(testData.url)
				.put(`/events/${eventId}`)
				.set('Authorization', 'Bearer ' + token)
				.send(event);

			event = res.body;
			expect(res.body).to.have.property("title").that.equals(newTitle);
		});
	});


	describe('#POST /events/:id/slots', function () {
		it('should add user to event', async () => {
			const slot = testData.user1;

			const res = await chai.request(testData.url)
				.post(`/events/${eventId}/slots`)
				.set('Authorization', 'Bearer ' + token)
				.send(slot)

			expect(res.body.slotId).to.equal(testData.user1.id);
		});

		it('should configure id', async () => {
			const slot = { name: testData.user2.name };

			const res = await chai.request(testData.url)
				.post(`/events/${eventId}/slots`)
				.set('Authorization', 'Bearer ' + token)
				.send(slot)

			expect(res.body.slotId).to.equal(testData.user2.name.toUpperCase().replace(/\s/g, '_'));
		});
	});

	describe('#GET /events/:id/slots', function () {
		it('should retrieve slots of the event', async () => {
			const res = await chai.request(testData.url)
				.get(`/events/${eventId}/slots`)
				.set('Authorization', 'Bearer ' + token);

			expect(res.body.length).to.equal(2);
		});
	});

	describe('#DELETE /events/:id/participants/:userId', function () {
		it('should remove user from event', async () => {
			const slotId = testData.user1.id;
			const res = await chai.request(testData.url)
				.delete(`/events/${eventId}/slots/${slotId}`)
				.set('Authorization', 'Bearer ' + token);

			expect(res).to.have.status(200);
		});
	});

	describe('#DELETE /event/:eventId', function () {
		it('should delete event', async () => {
			const res = await chai.request(testData.url)
				.delete(`/events/${eventId}`)
				.set('Authorization', 'Bearer ' + token);

			expect(res).to.have.status(200);
		});
	});

	// describe('Update Event', function() {
	// 	let _event;

	// 	it('should update the tags in the event', function() {
	// 		let newIshEvent = Object.assign({}, _event, {tags: core.tags.tags1});
	// 		return chai.request(core.urls.evently)
	// 			.put(`/events/${_event._id}`)
	// 			.send(newIshEvent)
	// 			.then(res => {
	// 				expect(res.body).to.have.property("tags").that.contains(core.tags.tags1[0]);
	// 			});
	// 		});
	// });

	// describe('#GET /events?tags=test', function() {
	// 	before(() => generateEvent({tags: ['foo']}));
	// 	before(() => generateEvent({tags: ['foo', 'bar']}));

	// 	it('should return 2 events by tags query', function() {
	// 		return chai.request(core.urls.evently)
	// 			.get(`/events/`)
	// 			.query({tags: ['foo']})
	// 			.then(res => {
	// 				expect(res.body.length).to.equal(2);
	// 			});
	// 	});

	// 	it('should return 1 events by tags query', function() {
	// 		return chai.request(core.urls.evently)
	// 			.get(`/events/`)
	// 			.query({tags: ['foo', 'bar']})
	// 			.then(res => {
	// 				expect(res.body.length).to.equal(1);
	// 			});
	// 	});
	// });
});