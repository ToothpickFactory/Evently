const db = require(appRoot + "/connections/firebase").db;
const callHook = require(appRoot + "/modules/webhooks/callHook");
const codes = require(appRoot + '/modules/codes');

module.exports = async function (event) {
  try {
    await db.collection("events").doc(event._id).delete();
    callHook("EVENT_REMOVED", event);
    return;
  } catch (err) {
    throw codes.serverError(err);
  }
};