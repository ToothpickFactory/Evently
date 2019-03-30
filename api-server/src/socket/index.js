const mrEmitter = require('../util/mrEmitter');
const getEvent = require('../modules/events/getEvent');


module.exports = function (io) {
	io.on('connection', (socket) => {
		const event_id = socket.handshake.query.event_id;
		socket.join(event_id);
		io.to(event_id).emit('news', 'WELCOME TO THE ROOM ' + event_id);
	});

	mrEmitter.on('EVENT_UPDATED', async (event_id) => {
		const event = await getEvent(event_id);
		io.to(event_id).emit('EVENT_UPDATED', event);
	});
}
