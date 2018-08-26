const Mongo = require(appRoot + "/connections/mongo");
const personValidator = require(appRoot + "/schemas/person/validator");
const codes = require("../codes");

async function doJoin(_id, newSlot, clientId) {
  let db = await Mongo.getDB();
  let query = {
    _id,
    clientId,
    "slots.id": {
      $ne: newSlot.id
    }
  };
  let sort = [];
  let update = {
    $push: {
      slots: newSlot
    }
  };
  let options = {
    new: true
  };
  let dbRes = await db
    .collection("events")
    .findAndModify(query, sort, update, options);

  if (dbRes.lastErrorObject.updatedExisting && dbRes.lastErrorObject.n) {
    return dbRes.value;
  } else if (!dbRes.lastErrorObject.updatedExisting) {
    return Promise.reject(codes.userInEvent());
  }
}

async function joinEvent(_id, slot, clientId) {
  let newSlot = {
    id: slot.id || slot.name.toUpperCase(),
    name: slot.name
  };
  let result = personValidator(newSlot);
  return result.errors.length
    ? Promise.reject(result.errors)
    : doJoin(_id, newSlot, clientId);
}

module.exports = joinEvent;
