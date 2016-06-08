var Data = require('../modules/database');
var mongoose = require('mongoose');
var configDB = require('../config/database');

var args = process.argv.slice(2);

mongoose.connect(configDB.url);
var db = mongoose.connection;

// If no argument has been given
if (typeof(args[0]) === 'undefined') {
	
	console.log('No argument has given');
	console.log('Please give an URL to the CSV file as argument. Example: file/data/example.csv');
	
} else if (args[0] === 'Radio') {
	
	// Init MongoDB connection
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		console.log('MongoDB connected at: ' + configDB.url);
	});
	
	// Message to terminal
	console.log('Removing all the collections in Data.Radio');

	// Remove all data from Data.Radio
	Data.Radio.remove({}, function(err, succes) {
		if (err) {
			console.log(err);
		}

		console.log(succes);
	});
	
} else if (args[0] === 'User') {
	
	// Init MongoDB connection
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		console.log('MongoDB connected at: ' + configDB.url);
	});
	
	// Message to terminal
	console.log('Removing all the collections in Data.Mobile');
	
	Data.User.remove({}, function(err, succes) {
	if (err) {
		console.log(err);
	}
	
	console.log(succes);
});
	
} else if (args[0] === 'Moz') {
	
	// Init MongoDB connection
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		console.log('MongoDB connected at: ' + configDB.url);
	});
	
	// Message to terminal
	console.log('Removing all the collections in Data.Moz');
	
	Data.Moz.remove({}, function(err, succes) {
		if (err) {
			console.log(err);
		}

		console.log(succes);
	});
	
}

// Close database
//db.close();