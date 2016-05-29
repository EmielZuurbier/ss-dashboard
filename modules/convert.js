var fs = require('fs');
var Converter = require("csvtojson").Converter;

exports.ert = function (file, callback) {
	
	// Container for decoded file
	var container = [];
	
	// Create converter object
	var converter = new Converter({
		constructResult: true,
		workerNum: 2
	});
	
	// Convert file
	converter.fromFile(file, function(error, result) {
		if (error) {
			console.log('CSV Converting error: ' + error);
		} else {
			container = result;
			callback(container);
		}
	});
	
};