const validateEvent = require(appRoot + "/schemas/event/validator");
const Mongo = require(appRoot + "/connections/mongo");
const mapEvent = require("./mapEvent");

module.exports = async function(event, clientId) {
  let db = await Mongo.getDB();
  event.clientId = clientId;
  let newEvent = mapEvent(event);
  let result = validateEvent(newEvent);
  if (result.errors.length) {
    return Promise.reject(result.errors);
  } else {
    let dbRes = await db.collection("events").insert(newEvent);
    return dbRes.ops[0];
  }
};
