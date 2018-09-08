const db = require(appRoot + "/connections/firebase").db;

module.exports = async function (event) {
  return event.slots;
};