const shortid       = require('shortid');
const appRootDir    = require('app-root-dir').get();
const validateEvent = require(appRootDir + "/src/schemas/event/validator");
const Mongo         = require(appRootDir + '/src/connections/mongo');
const mapEvent      = require('./mapEvent');

module.exports = async function(event, clientId){
    let db = await Mongo.getDB();
    event.clientId = clientId;
    let newEvent = mapEvent(event);
    let result = validateEvent(newEvent);
    if( result.errors.length ){
        return Promise.reject(result.errors);
    } else {
        let dbRes = await db.collection('events').insert(newEvent);
        return dbRes.ops[0];
    }
}
