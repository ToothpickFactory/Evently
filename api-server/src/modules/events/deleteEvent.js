const appRootDir	= require('app-root-dir').get();
const Mongo         = require(appRootDir + '/src/connections/mongo');
const callHook      = require(appRootDir + '/src/modules/webhooks/callHook');

module.exports = async function(_id, clientId){
    let db = await Mongo.getDB();
    let query = {_id, clientId};
    let sort = [];
    let update = {remove: true};
    let options = {new: false};

    let DBRes = await db.collection('events').findAndModify(query, sort, update, options);
    callHook("EVENT_REMOVED", DBRes.value);
    return DBRes;
}