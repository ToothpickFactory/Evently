const appRootDir	    = require('app-root-dir').get();
const Mongo             = require(appRootDir + '/src/connections/mongo');
const personValidator   = require(appRootDir + '/src/schemas/person/validator');
const codes             = require('../codes');

async function doJoin(_id, newParticipant, clientId) {
    let db = await Mongo.getDB();
    let query =  { _id, clientId, 'participants.id': {$ne: newParticipant.id} }; 
    let sort = [];
    let update = { $push: { participants: newParticipant } };
    let options = { new: true };
    let dbRes = await db.collection('events').findAndModify(query, sort, update, options);

    if(dbRes.lastErrorObject.updatedExisting && dbRes.lastErrorObject.n){
        return dbRes.value;
    } else if(!dbRes.lastErrorObject.updatedExisting){
        return Promise.reject(codes.userInEvent());
    }
}

async function joinEvent(_id, participant, clientId){
    let db = await Mongo.getDB();
    let newParticipant = {
        id: participant.id || participant.name.toUpperCase(),
        name: participant.name
    }
    let result = personValidator(newParticipant);
    return result.errors.length ? Promise.reject(result.errors) : doJoin(_id, newParticipant, clientId);
}

module.exports = joinEvent;