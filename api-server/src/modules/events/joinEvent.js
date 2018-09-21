const db = require(appRoot + "/connections/firebase").db;
const slotPrevision = require("./slotPrevision");
const firestore = require("firebase-admin").firestore;
const personValidator = require(appRoot + "/schemas/person/validator");
const codes = require("../codes");

async function joinEvent(event, slot) {
  const slots = event.slots;
  
  const newSlot = slotPrevision(slot);

  const result = personValidator(newSlot);

  if (result.errors.length) throw Error(result.errors);

  if (slots.some(slot => slot.id === newSlot.id)) {
    throw codes.userInEvent();
  }

  try {
    await db.collection("events").doc(event._id).update({
      slots: firestore.FieldValue.arrayUnion(newSlot)
    });
    return {
      slotId: newSlot.id
    };
  } catch (err) {
    throw codes.serverError(err);
  }
}

module.exports = joinEvent;