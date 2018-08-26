const appRootDir	= require('app-root-dir').get();
const Mongo       = require(appRootDir + '/src/connections/mongo');

async function getEvents(rawQuery = {}, clientId){
  let query = queryBuilder(rawQuery, clientId);
  let db = await Mongo.getDB();
  let documents = await db.collection('events').find(query).toArray();
  return documents;
}

function queryBuilder(rawQuery, clientId){
  let query = {};

  if(clientId){
    query.clientId = clientId;
  }

  if(rawQuery.rangeStart){
    if(!query.startTime) query.startTime = {};
    query.startTime.$gt = Number(rawQuery.rangeStart);
  }

  if(rawQuery.rangeEnd){
    if(!query.startTime) query.startTime = {};
    query.startTime.$lt = Number(rawQuery.rangeEnd);
  }

  if(rawQuery.tags){
    let tags = Array.isArray(rawQuery.tags) ? rawQuery.tags : [rawQuery.tags];
    query.tags = { $all: tags };
  }

  return query;
}

module.exports = getEvents;