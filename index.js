const express 		= require('express');
const app 			= express();
const routes 		= require('./server/routes');
const bodyParser 	= require('body-parser');

//bodyParser filter
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// access control allow origin

app.all('/api', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, api_key');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	res.header('Content-Type', 'application/json; charset = utf-8');
	next();
});

routes(app);
// routes
app.use('/swagger', express.static('./swagger'));
// app.use('/src', express.static('src'));
app.use('/back', express.static('public'));
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3089, function () {
  console.log('Example app listening on port 3089!');
});