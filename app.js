var express = require('express');
var app = express();
var server = app.listen(3000);
//var server = app.listen(80);
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
var session = require('express-session');
var passport = require('passport');

var routes = require('./routes/index');
var admin = require('./routes/admin');
var conv = require('./modules/convert');
var Data = require('./modules/database');
var Moz = require('./config/mozilla');

require('./config/passport')(passport);

// MongoDB
var configDB = require('./config/database');

mongoose.connect(configDB.url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  	console.log('MongoDB connected at: ' + configDB.url);
});


//Data.Radio.find({}, function(err, collections) {
//	  if (err) throw err;
//
//	  // object of all the users
//	  console.log(collections);
//});
//
//// get all the users
//Data.Account.find({}, function(err, collections) {
//	  if (err) throw err;
//
//	  // object of all the users
//	  console.log(collections);
//});


// view engine setup
app.engine('hbs', exphbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// Session settings
app.use(session({ secret: 'ss-dashboardiswhatineed' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// uncomment after 
// placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Route for pages
app.use('/', routes);
app.use('/admin', admin);
//app.post('/api', function (req, res, next) {
//	console.log(req.body);
//	io.on('connection', function (socket) {
//		socket.on('bbq', function(data) {
//            console.log(data);
//            socket.emit(req.body);
//        });
//	});
//	res.status(200).json({'message': 'Data received'});
//});


// Socket connection start
io.on('connection', function (socket) {
	
	// Send data from MongoDB to client
//	Data.Radio.find({}, function(err, collections) {
//		if (err) throw err;
////		var package = collections.filter(function (f) {
////			return f.lat !== 'null' || f.lng !== 'null'
////		});
//		socket.emit('radio', collections);
//	});
	
	Data.User.find({}, function(err, collections) {
		if (err) throw err;
		var package = collections.filter(function (f) {
			return f.lat !== 'null' || f.lng !== 'null'
		});
		socket.emit('mobile', package);
	});
	
//	Data.Moz.find({}, function(err, collections) {
//		if (err) throw err;
//		var package = collections.filter(function (f) {
//			return f.lat !== 'null' || f.lng !== 'null'
//		});
//		socket.emit('moz', package);
//	});

	// Receive data from client
	socket.on('geolocation', function (data) {
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
