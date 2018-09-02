const validateEvent = require(appRoot + "/schemas/event/validator");
const db = require(appRoot + "/connections/firebase").db;
const mapEvent = require("./mapEvent");

module.exports = async function (event, clientId) {
  event.clientId = clientId;
  let newEvent = mapEvent(event);
  let result = validateEvent(newEvent);
  if (result.errors.length) {
    return Promise.reject(result.errors);
  } else {
    try {
      await db.collection("events").doc(newEvent._id).set(newEvent);
      return {
        eventId: newEvent._id
      };
    } catch (err) {
      return Promise.reject(err);
    }
  }
};