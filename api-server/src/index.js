const config			= require("config");
const express			= require("express");
const app           	= express();
const bodyParser	  	= require('body-parser');
const cors          	= require('cors');
const Mongo         	= require('./connections/mongo');
const api				= require('./api');
const crons				= require('./crons');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

Mongo.getDB()
	.then(() => {
		api(app);
		crons();
		app.listen(config.port, () => { console.log(`Evently running on port: ${config.port}`) });
	})
	.catch((err) => {
		console.log(err)
		console.log('Server was unable to start');
	})


