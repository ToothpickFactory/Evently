const db = require(appRoot + "/connections/firebase").db;
const codes = require("../codes");

async function getEvent(_id, clientId) {
  let eventDoc;
  try {
    eventDoc = await db.collection("events").doc(_id).get();
  } catch (err) {
    throw codes.serverError(err);
  }

  if (!eventDoc.exists) {
    throw codes.eventNotFound(_id);
  }

  const event = eventDoc.data();

  if (event.clientId !== clientId) {
    throw codes.forbidden();
  }
  return event;
}

module.exports = getEvent;