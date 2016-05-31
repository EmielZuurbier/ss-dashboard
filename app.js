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



// Socket connection start
io.on('connection', function (socket) {
	
	// Send data from MongoDB to client
	Data.Radio.find({}, function(err, collections) {
		if (err) throw err;
		socket.emit('cell', collections);
	});
	
	// Convert Mobile App file and send it to client
	conv.ert('data/files/3c4b4929442b8a98.csv', function (data) {
		socket.emit('mobile', data);
	});

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
