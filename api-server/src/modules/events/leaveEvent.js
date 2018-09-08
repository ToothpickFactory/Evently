const db = require(appRoot + "/connections/firebase").db;
const codes = require("../codes");

module.exports = async function (event, userId) {
  userId = userId.toUpperCase();
  event.slots = event.slots.filter(slot => slot.id !== userId);
  try {
    db.collection("events").doc(event._id).update(event);
    return;
  } catch (err) {
    throw codes.serverError(err);
  }
};