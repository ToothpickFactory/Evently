const db = require(appRoot + "/connections/firebase").db;
const codes = require("../codes");

async function removeByClientId(clientId) {
  try {
    const eventsRef = await db.collection("events").where("clientId", "==", clientId).get();
    eventsRef.docs.forEach(event => event.delete());
  } catch (err) {
    throw codes.serverError(err);
  }
}

module.exports = removeByClientId;