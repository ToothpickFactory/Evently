const validateEvent = require(appRoot + '/schemas/event/validator');
const db = require(appRoot + '/connections/firebase').db;
const mapEvent = require('./mapEvent');
const codes = require(appRoot + '/modules/codes');

module.exports = async function (event) {
  const newEvent = mapEvent(event);
  const result = validateEvent(newEvent);
  if (result.errors.length) throw result.errors;
  try {
    await db.collection('events').doc(newEvent._id).set(newEvent);
    return newEvent;
  } catch (err) {
    throw codes.serverError(err);
  }
};