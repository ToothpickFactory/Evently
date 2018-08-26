const Mongo = require(appRoot + "/connections/mongo");
const codes = require("../codes");

module.exports = async function(_id, userId, clientId) {
  let db = await Mongo.getDB();
  let query = { _id, clientId, "slots.id": { $eq: userId } };
  let sort = [];
  let update = { $pull: { slots: { id: userId } } };
  let options = { new: true };
  let dbRes = await db
    .collection("events")
    .findAndModify(query, sort, update, options);
  if (dbRes.lastErrorObject.updatedExisting && dbRes.lastErrorObject.n) {
    return dbRes.value;
  } else if (!dbRes.lastErrorObject.updatedExisting) {
    return Promise.reject(codes.notInEvent());
  }
};
