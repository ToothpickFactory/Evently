const shortid = require("shortid");
const slotPrevision = require("./slotPrevision");

function mapEvent(rawEvent, id) {
  let event = {};

  event._id = rawEvent._id || id || shortid.generate();
  event.clientId = rawEvent.clientId;
  event.title = rawEvent.title;
  event.maxSlots = rawEvent.maxSlots || 10;
  event.startTime = rawEvent.startTime || Date.now() + 300000;
  event.slots = rawEvent.slots || [];
  event.tags = (rawEvent.tags || []).map(tag => tag.trim());
  event.webhook = rawEvent.webhook || "";
  event.owner = rawEvent.owner ? slotPrevision(rawEvent.owner) : null;

  return event;
}

module.exports = mapEvent;