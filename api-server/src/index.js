// Source .env to process.env
require('dotenv').config();

// Sets Global App Root
const path = require('path');
global.appRoot = path.resolve(__dirname);

const fs = require('fs');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const server = process.env.MODE === 'HTTPS'
    ? require('https').createServer({ cert: fs.readFileSync('./sslcert/fullchain.pem'), key: fs.readFileSync('./sslcert/privkey.pem') }, app)
    : require('http').createServer(app);
const io = require('socket.io')(server);
const socket = require('./socket');
const api = require('./api');
const crons = require('./crons');

app.use(cors({ exposedHeaders: 'Authorization' }));
app.use(express.static('src/static'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
api(app);
socket(io);
crons();

server.listen(process.env.PORT, () => console.log(`Evently ${process.env.MODE} running on port: ${process.env.PORT}`));