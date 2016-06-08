var Data = require('../modules/database');
var mongoose = require('mongoose');
var configDB = require('../config/database');

mongoose.connect(configDB.url);
var db = mongoose.connection;

// Init MongoDB connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  	console.log('MongoDB connected at: ' + configDB.url);
});

// Message to terminal
console.log('Checking the collections of Data.Radio');

// Check collections in Data.Radio
Data.Radio.find({}, function(err, collections) {
	  if (err) throw err;

	  // object of all the users
	  console.log(collections);
});

// Message to terminal
console.log('Checking the collections of Data.Mobile');

// Check collections in Data.Radio
Data.User.find({}, function(err, collections) {
	  if (err) throw err;

	  // object of all the users
	  console.log(collections);
});

// Message to terminal
console.log('Checking the collections of Data.Moz');

// Check collections in Data.Radio
Data.Moz.find({}, function(err, collections) {
	  if (err) throw err;

	  // object of all the users
	  console.log(collections);
});