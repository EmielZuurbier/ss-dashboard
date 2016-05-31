
/*

DATA.JS
AUTHOR: EMIEL ZUURBIER

*/


var data = (function (url) {
	'use strict';
	
	var socket;
		
	if (typeof(url) === undefined) {
		socket = io.connect();
	} else {
		socket = io.connect(url);
	}
	
	// Socket init
	function socketInit() {
		
		// Add data from cellular tower
		socket.on('cell', function (data) {
			
			console.log(data);
			
			// Render markers
			maps.addMarkers(data);
			maps.addHeat(data);
			
			// Draw graph
			graph.line(data);
			graph.bar(data);
		});
		
		/*
		socket.on('mobile', function (data) {
			
			console.log(data);
			maps.addAppMarkers(data);
			
		});
		*/
		
		// Connect socket to server
		socket.on('rf', function (data) {
			
			data = JSON.parse(data);
			
			// Draw graph
			graph.line(data);
			graph.bar(data);
  		});
		
	}
	
	
	return {
		socket: socket,
		socketInit: socketInit
	};
	
	
}());