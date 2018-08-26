const Mongo = require(appRoot + "/connections/mongo");

module.exports = async function(_id, clientId) {
  let db = await Mongo.getDB();
  return db
    .collection("events")
    .findOne({ _id, clientId }, { _id: 0, slots: 1 });
};
