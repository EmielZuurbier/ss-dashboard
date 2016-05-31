var conv = require('../modules/convert');
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

// Message to console
console.log('Converting the CSV file to JSON and put it in the MongoDB');

// Start converting
conv.ert('data/files/cell_towers_diff-2016052200.csv', function (data) {
	
	data.forEach(function(item) {
		
		var rf = new Data.Radio({ 
			radio: item.radio,
			mcc: item.mcc,
			net: item.net,
			area: item.area,
			cell: item.cell,
			unit: item.unit,
			lon: item.lon,
			lat: item.lat,
			range: item.range,
			samples: item.samples,
			changeable: item.changeable,
			created: item.created,
			updated: item.updated,
			averageSignal: item.averageSignal
		});

		rf.save(function (err) {
			if (err) {
				console.log('Database save error: ' + err);
			} else {
				console.log(rf + ' has been saved');
			}
		});
		
	});
	
	// Log all the data that has been stored
//	Data.Radio.find({}, function(err, collections) {
//		  if (err) throw err;
//
//		  // object of all the users
//		  console.log(collections);
//	});
	
	// Close connection
//	db.close();
//	
});