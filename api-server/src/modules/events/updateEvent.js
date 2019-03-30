const db = require(appRoot + "/connections/firebase").db;
const codes = require("../codes");
const validateEvent = require(appRoot + "/schemas/event/validator");
const mapEvent = require("./mapEvent");

async function updateEvent(event, updatedEvent) {
  updatedEvent = mapEvent(updatedEvent);
  const result = validateEvent(updatedEvent);
  if (result.errors.length) throw result.errors;
  try {
    await db.collection("events").doc(event._id).update(updatedEvent);
    return updatedEvent;
  } catch (err) {
    console.log(err)
    throw codes.serverError(err);
  }
}

module.exports = updateEvent;