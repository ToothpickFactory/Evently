module.exports = function (err) {
	console.error(err);
	return {
		status: 500,
		msg: "Crap... We broke something..."
	};
}