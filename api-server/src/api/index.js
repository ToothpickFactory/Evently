const AuthMiddle = require(appRoot + "/middleware/authMiddle");

const authGetController = require(appRoot + '/controllers/authGetController');
const authPostController = require(appRoot + '/controllers/authPostController');
const eventsGetController = require(appRoot + '/controllers/eventsGetController');
const eventsPostController = require(appRoot + '/controllers/eventsPostController');
const eventDeleteController = require(appRoot + '/controllers/eventDeleteController');
const eventGetController = require(appRoot + '/controllers/eventGetController');
const eventPutController = require(appRoot + '/controllers/eventPutController');
const slotsDeleteController = require(appRoot + '/controllers/slotsDeleteController');
const slotsGetController = require(appRoot + '/controllers/slotsGetController');
const slotsPostController = require(appRoot + '/controllers/slotsPostController');

module.exports = function (app) {
	app.get('/auth', authGetController);
	app.post('/auth', authPostController);

	app.use('/events', AuthMiddle);
	app.get('/events', eventsGetController);
	app.post('/events', eventsPostController);

	app.delete('/events/:id', eventDeleteController);
	app.get('/events/:id', eventGetController);
	app.put('/events/:id', eventPutController);

	app.delete('/events/:id/slots/:userId', slotsDeleteController);
	app.get('/events/:id/slots', slotsGetController);
	app.post('/events/:id/slots', slotsPostController);
}