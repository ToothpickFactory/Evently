import fs from 'fs';
import https from 'https';
import http from 'http';
import app from './app';
import SocketIO from './socket';
import crons from './crons';

const server = process.env.MODE === 'HTTPS'
	? https.createServer({ cert: fs.readFileSync('./sslcert/fullchain.pem'), key: fs.readFileSync('./sslcert/privkey.pem') }, app)
	: http.createServer(app);

SocketIO(server);
crons();

server.listen(process.env.PORT, () => console.log(`Evently ${process.env.MODE} running on port: ${process.env.PORT}`));
