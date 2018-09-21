function slotPrevision(slot) {
	if(typeof slot === 'string'){
		slot = { name: slot };
	}
	
	return {
		id: slot.id || slot.name.toUpperCase().replace(/\s/g, '_'),
		name: slot.name
	};
}

module.exports = slotPrevision;