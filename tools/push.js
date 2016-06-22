var Data = require('../modules/database');
var mongoose = require('mongoose');
var configDB = require('../config/database');
var fs = require('fs');
var _ = require('underscore');

mongoose.connect(configDB.url);
var db = mongoose.connection;

// Init MongoDB connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  	console.log('MongoDB connected at: ' + configDB.url);
});

// Get argument
var args = process.argv.slice(2);
console.log('Path: ' + args[0], 'Destination: ' + args[1]);

if (args[1] === 'OC') {
	
	// Open the file given in the argument
	fs.readFile(args[0], 'utf-8', function (err, data) {
		if (err) throw err;

		// Parse JSON
		var stringified = JSON.parse(data);

		// Filter data
		var filtered = stringified.filter(function (item) {
			return item.mcc === 204; // Area code for The Netherlands
		});

		// Add filtered array to database
		filtered.forEach(function (item) {

			// Create new collection
			var collection = new Data.Radio({ 
				radio: 			item.radio,
				mcc: 			item.mcc,
				net: 			item.net,
				area: 			item.area,
				cell: 			item.cell,
				unit: 			item.unit,
				lon: 			item.lon,
				lat: 			item.lat,
				range: 			item.range,
				samples: 		item.samples,
				changeable: 	item.changeable,
				created: 		item.created,
				updated: 		item.updated,
				averageSignal: 	item.averageSignal
			});

			// Save collection
			collection.save(function (err) {
				if (err) {
					console.log('Database save error: ' + err);
				} else {
					console.log(collection + ' has been saved');
				}
			});

		});
	});
	
} else if (args[1] === 'Moz') {
	// Open the file given in the argument
	fs.readFile(args[0], 'utf-8', function (err, data) {
		if (err) throw err;

		// Parse JSON
		var stringified = JSON.parse(data);

		// Filter data
		var filtered = stringified.filter(function (item) {
			return item.mcc === 204; // Area code for The Netherlands
		});

		// Add filtered array to database
		filtered.forEach(function (item) {

			// Create new collection
			var collection = new Data.Moz({ 
				radio: 			item.radio,
				mcc: 			item.mcc,
				net: 			item.net,
				area: 			item.area,
				cell: 			item.cell,
				unit: 			item.unit,
				lon: 			item.lon,
				lat: 			item.lat,
				range: 			item.range,
				samples: 		item.samples,
				changeable: 	item.changeable,
				created: 		item.created,
				updated: 		item.updated,
				averageSignal: 	item.averageSignal
			});

			// Save collection
			collection.save(function (err) {
				if (err) {
					console.log('Database save error: ' + err);
				} else {
					console.log(collection + ' has been saved');
				}
			});

		});
	});
} else if (args[1] === 'User') {
	// Open the file given in the argument
	fs.readFile(args[0], 'utf-8', function (err, data) {
		if (err) throw err;

		// Parse JSON
		var stringified = JSON.parse(data),
			filtered = stringified.filter(function(item) {
				return item.gps_lat !== "null";
			});
		
		console.log(filtered);

		// Add filtered array to database
		filtered.forEach(function (item) {

			// Create new collection
			var collection = new Data.User({
				currentTime: 	item.current_time,
				deviceName: 	item.device_name,
				noise:			item.noise,
				lat:			item.gps_lat,
				lng:			item.gps_lng,
				accuracy:		item.gps_ccuracy,
				cellDb:			item.cell_db,
				cellAsu:		item.cell_asu,
				wlanSsid:		item.wlan_ssid,
				wlanStrength:	item.wlan_strength,
				wlanEncryption:	item.wlan_encryption
			});

			// Save collection
			collection.save(function (err) {
				if (err) {
					console.log('Database save error: ' + err);
				} else {
					console.log(collection + ' has been saved');
				}
			});

		});
	});
} else {
	console.log('Please give a second argument. Options are "OC" or "Moz"');
}