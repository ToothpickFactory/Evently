const db = require(appRoot + "/connections/firebase").db;
const mrEmitter = require('../../util/mrEmitter');
const codes = require("../codes");

module.exports = async function (event, userId) {
  userId = userId.toUpperCase();
  event.slots = event.slots.filter(slot => slot.id !== userId);
  try {
    await db.collection("events").doc(event._id).update(event);
    mrEmitter.emit('EVENT_UPDATED', event._id);
    return;
  } catch (err) {
    throw codes.serverError(err);
  }
};