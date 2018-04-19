module.exports = function (app) {
	app.use('/api', require('./reg'));
	app.use('/api', require('./login'));
	app.use('/api', require('./article'));
	app.use('/api', require('./classify'));
}