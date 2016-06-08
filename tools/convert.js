var conv = require('../modules/convert');
var Data = require('../modules/database');
var mongoose = require('mongoose');
var _ = require('underscore');
var configDB = require('../config/database');

var args = process.argv.slice(2);
console.log(args[0]);
console.log(args[1]);
console.log(typeof(args[0]));

// If no argument has been given
if (typeof(args[0]) === 'undefined') {
	
	console.log('No argument has given');
	console.log('Please give an URL to the CSV file as argument. Example: file/data/example.csv');
	
} else {

	mongoose.connect(configDB.url);
	var db = mongoose.connection;

	// Init MongoDB connection
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		console.log('MongoDB connected at: ' + configDB.url);


		// If source is from Mozilla or OpenCell
		if (args[1] === 'Radio') {

			// Message to console
			console.log('Converting the CSV file to JSON and put it in the MongoDB');

			// Start converting
			conv.ert(args[0], function (data) {
				
				// Filter out any duplicate lat's and lon's
//				var filter = _.uniq(data, function(item) {
//					return item.lat + item.lng;
//				});

				data.forEach(function(item) {

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

					collection.save(function (err) {
						if (err) {
							console.log('Database save error: ' + err);
						} else {
							console.log(collection + ' has been saved');
						}
					});

				});

			})
			
		 	// Close connection
//			db.close();

		} else if (args[1] === 'User') {

			conv.ert(args[0], function (data) {
				
				// Filter out any duplicate lat's and lon's
				var filter = _.uniq(data, function(item) {
					return item.gps_lat + item.gps_lng;
				});

				filter.forEach(function(item) {

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

			conv.ert(args[0], function (data) {
				
				// Filter out any duplicate lat's and lon's
				var filter = _.uniq(data, function(item) {
					return item.lat + item.lng;
				});

				filter.forEach(function(item) {

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

			console.log('Please give a second argument of "Radio" for data from OpenCell or "User" for self generated data or "Moz" for data from mozilla');
			db.close();
		}
		
	});
}