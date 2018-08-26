const auth = require("./auth");
const events = require("./events");

module.exports = function(app){
	auth(app);
	events(app);
}