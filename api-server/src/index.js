// Source .env to process.env
require('dotenv').config();

// Sets Global App Root
const path = require('path');
global.appRoot = path.resolve(__dirname);

const https = require('https');
const fs = require('fs');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./api');
const crons = require('./crons');
const options = {
    cert: fs.readFileSync('./sslcert/fullchain.pem'),
    key: fs.readFileSync('./sslcert/privkey.pem')
};

app.use(cors());
app.use(express.static('src/static'));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

api(app);

crons();
https.createServer(options, app).listen(process.env.PORT, () => console.log(`Evently running on port: ${process.env.PORT}`));