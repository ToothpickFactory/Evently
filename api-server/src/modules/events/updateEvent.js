const appRootDir    = require('app-root-dir').get();
const shortid       = require('shortid');
const validateEvent = require(appRootDir + '/src/schemas/event/validator');
const Mongo         = require(appRootDir + '/src/connections/mongo');
const mapEvent      = require('./mapEvent');

async function doUpdate(_id, updatedEvent, clientId) {
    let db = await Mongo.getDB();
    let query = { _id, clientId }; 
    let sort = [];
    let update = updatedEvent;
    let options = { new: true };
    let dbRes = await db.collection('events').findAndModify(query, sort, update, options);
    return dbRes.value;
}

async function updateEvent(_id, event, clientId) {
    let updatedEvent = mapEvent(event, _id);
    let result = validateEvent(updatedEvent);
    return result.errors.length ? Promise.reject(result.errors) : doUpdate(_id, updatedEvent, clientId);
}

module.exports = updateEvent;


