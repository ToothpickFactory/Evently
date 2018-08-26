const Mongo = require(appRoot + "/connections/mongo");
const callHook = require(appRoot + "/modules/webhooks/callHook");

module.exports = async function(_id, clientId) {
  let db = await Mongo.getDB();
  let query = { _id, clientId };
  let sort = [];
  let update = { remove: true };
  let options = { new: false };

  let DBRes = await db
    .collection("events")
    .findAndModify(query, sort, update, options);
  callHook("EVENT_REMOVED", DBRes.value);
  return DBRes;
};
