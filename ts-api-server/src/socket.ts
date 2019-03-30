import http from 'http';
import https from 'https';
import _SocketIO from 'socket.io';
import { EventClass, EVENT_UPDATED } from './models/Event/Event';

export default (server: http.Server | https.Server) => {
	const IO = _SocketIO(server);

	IO.on('connection', (socket: _SocketIO.Socket) => {
		const event_id = socket.handshake.query.event_id;
		socket.join(event_id);
		this.IO.to(event_id).emit('news', 'WELCOME TO THE ROOM ' + event_id);
	});

	EventClass.on(EVENT_UPDATED, (event: EventClass) => {
		IO.to(event.event_id).emit(EVENT_UPDATED, event.toJSON());
	});
};
