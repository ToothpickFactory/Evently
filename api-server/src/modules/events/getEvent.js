const db = require(appRoot + "/connections/firebase").db;
const codes = require("../codes");

async function getEvent(_id) {
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

  return event;
}

module.exports = getEvent;