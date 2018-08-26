const appRootDir	= require('app-root-dir').get();
const Mongo         = require(appRootDir + '/src/connections/mongo');
const codes         = require('../codes');

module.exports = async function(_id, userId, clientId){
    let db = await Mongo.getDB();
    let query = { _id, clientId, 'participants.id': {$eq: userId} }; 
    let sort = [];
    let update = { $pull: { participants: { id: userId } } };
    let options = { new: true };
    let dbRes = await db.collection('events').findAndModify(query, sort, update, options);
    if(dbRes.lastErrorObject.updatedExisting && dbRes.lastErrorObject.n){
        return dbRes.value;
    } else if(!dbRes.lastErrorObject.updatedExisting){
        return Promise.reject(codes.notInEvent());
    }
}