var express = require('express');
var app = express();
var server = app.listen(3000);
//var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var _ = require('underscore');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var Converter = require('csvtojson').Converter;

var routes = require('./routes/index');
var admin = require('./routes/admin');
var conv = require('./modules/convert');
var Radio = require('./modules/database');
var Account = require('./modules/account');

// view engine setup
app.engine('hbs', exphbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//app.use('/', routes);
//app.get('/', function (req, res) {
////  	res.sendFile('index.html');
//	res.render('index');
//});

// Route for pages
app.use('/', routes);
app.use('/admin', admin);


// MongoDB
mongoose.connect('mongodb://localhost/data/db');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  	console.log("we're connected!")
});

/*
conv.ert('data/files/cell_towers_diff-2016052200.csv', function (data) {

	var rf = new Radio({ 
		radio: data[0].radio,
		mcc: data[0].mcc,
		net: data[0].net,
		area: data[0].area,
		cell: data[0].cell,
		unit: data[0].unit,
		lon: data[0].lon,
		lat: data[0].lat,
		range: data[0].range,
		samples: data[0].samples,
		changeable: data[0].changeable,
		created: data[0].created,
		updated: data[0].updated,
		averageSignal: data[0].averageSignal
	});
	
	rf.save(function (err) {
		if (err) {
			console.log('Database save error: ' + err);
		} else {
			console.log(rf);
		}
	});
	
	// get all the users
	Radio.find({}, function(err, collections) {
		  if (err) throw err;

		  // object of all the users
		  console.log(collections);
	});
});
*/

// Socket connection start
io.on('connection', function (socket) {
	
	// Convert OpenCell file and send it to client
	conv.ert('data/files/cell_towers_diff-2016052200.csv', function (data) {
		socket.emit('cell', data);
	});
	
	// Convert Mobile App file and send it to client
	conv.ert('data/files/3c4b4929442b8a98.csv', function (data) {
		socket.emit('mobile', data);
	});
	
	// Decode file and send it to the client
	fs.readFile('data/files/testdata10000.json', function(error, filedata) {
		if(error) throw error;
		else socket.emit("rf", filedata.toString());
	});

	// Receive data from client
	socket.on('my other event', function (data) {
		console.log(data);
	});

});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  	var err = new Error('Not Found');
  	err.status = 404;
  	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  	app.use(function(err, req, res, next) {
    	res.status(err.status || 500);
    	res.render('error', {
      		message: err.message,
      		error: err
    	});
  	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  	res.status(err.status || 500);
  	res.render('error', {
    	message: err.message,
    	error: {}
  	});
});


module.exports = app;
