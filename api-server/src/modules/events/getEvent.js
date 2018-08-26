const Mongo = require(appRoot + "/connections/mongo");
const codes = require("../codes");

async function getEvent(_id, clientId) {
  let db = await Mongo.getDB();
  let event = await db.collection("events").findOne({ _id, clientId });
  return event ? event : Promise.reject(codes.eventNotFound(_id));
}

module.exports = getEvent;
