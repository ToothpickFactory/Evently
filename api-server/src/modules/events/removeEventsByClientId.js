const db = require(appRoot + "/connections/firebase").db;
const codes = require("../codes");

async function removeEventsByClientId(clientId) {
  try {
    const eventsRef = await db.collection("events").where("clientId", "==", clientId).get();
    const promiseArr = [];
    eventsRef.docs.forEach(event => promiseArr.push(event.ref.delete()));
    await Promise.all(promiseArr);
  } catch (err) {
    throw codes.serverError(err);
  }
}

module.exports = removeEventsByClientId;