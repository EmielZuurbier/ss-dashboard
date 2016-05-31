/*global console*/

/*

CSVDECODE.JS
AUTHOR: EMIEL ZUURBIER
COPYRIGHT: ALL RIGHTS RESERVERD

*/

var CSV = (function () {
	'use strict';
	
	function decode(csv) {
		console.log(csv);

		// Split lines
		var lines = csv.split("\n"),
			result = [],
			headers = lines[0].split(",");

		for (var i = 1; i < lines.length; i += 1) {

			var obj = {},
				currentline = lines[i].split(",");

			for (var j = 0; j < headers.length; j += 1) {
				obj[headers[j]] = currentline[j];
			}

			result.push(obj);
		}

		console.log(JSON.parse(result));
		return JSON.stringify(result); //JSON
	}
	
	function get(csv) {
		
	}
	
	return {
		decode: decode
	};
	
}());