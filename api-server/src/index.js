// Source .env to process.env
require('dotenv').config();

// Sets Global App Root
const path = require('path');
global.appRoot = path.resolve(__dirname);

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./api');
const crons = require('./crons');

app.use(cors());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

api(app);

crons();

app.listen(process.env.PORT, () => console.log(`Evently running on port: ${process.env.port}`));