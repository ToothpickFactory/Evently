const db = require(appRoot + "/connections/firebase").db;
const codes = require(appRoot + '/modules/codes');

async function getEvents(rawQuery = {}, clientId) {
  let queryRef = db.collection("events");

  if (clientId) {
    queryRef = queryRef.where("clientId", "==", clientId);
  }

  if (rawQuery.rangeStart) {
    queryRef = queryRef.where("startTime", ">", Number(rawQuery.rangeStart));
  }

  if (rawQuery.rangeEnd) {
    queryRef = queryRef.where("startTime", "<", Number(rawQuery.rangeEnd));
  }

  if (rawQuery.tags) {
    const tags = Array.isArray(rawQuery.tags) ? rawQuery.tags : [rawQuery.tags];
    queryRef = queryRef.where("tags", "array-contains", tags);
  }

  try {
    const eventsRef = await queryRef.get();
    const events = [];
    eventsRef.forEach(event => events.push(event.data()));
    return events;
  } catch (err) {
    throw codes.serverError(err);
  }
}

module.exports = getEvents;