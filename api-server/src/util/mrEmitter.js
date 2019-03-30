const EventEmitter = require('events');
class MrEmitter extends EventEmitter { }
const mrEmitter = new MrEmitter();
module.exports = mrEmitter;
