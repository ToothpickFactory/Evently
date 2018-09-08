const db = require(appRoot + "/connections/firebase").db;
const codes = require("../codes");
const validateEvent = require(appRoot + "/schemas/event/validator");
const mapEvent = require("./mapEvent");

async function updateEvent(event, updatedEvent) {
  const updatedEvent = mapEvent(updatedEvent, _id);
  const result = validateEvent(updatedEvent);
  if (result.errors.length) throw result.errors;
  try {
    db.collection("events").doc(event._id).update(updatedEvent);
  } catch (err) {
    console.log(err)
    throw codes.serverError(err);
  }
}

module.exports = updateEvent;