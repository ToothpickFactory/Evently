import fs from 'fs';
import https from 'https';
import http from 'http';
import app from './app';
import SocketIO from './socket';
import crons from './crons';

const port = Number(process.env.PORT);
const hostname = process.env.HOSTNAME;

const server = process.env.MODE === 'HTTPS'
	? https.createServer({ cert: fs.readFileSync('./sslcert/fullchain.pem'), key: fs.readFileSync('./sslcert/privkey.pem') }, app)
	: http.createServer(app);

SocketIO(server);
crons();
server.listen(
	port,
	hostname,
	() => console.log(`MODE: ${process.env.MODE} HOSTNAME: ${process.env.HOSTNAME} PORT: ${process.env.PORT}`)
);
