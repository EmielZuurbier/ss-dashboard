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
console.log('Removing all the collections in Data.Radio');

// Remove all data from Data.Radio
Data.Radio.remove({}, function(err, succes) {
	if (err) {
		console.log(err);
	}
	
	console.log(succes);
});

// Close database
//db.close();