
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
//		socket.on('radio', function (data) {
//			
//			console.log(data);
//			
//			// Render markers
//			maps.radioMarkers(data);
//			maps.addHeat(data);
//			
//			// Draw graph
//			graph.line(data);
//			graph.bar(data);
//			
//		});
		
		// Add data from mobile data
		socket.on('mobile', function (data) {
			
			console.log(data);
			maps.userMarkers(data);
			
		});
		
		// Add data from mobile data
//		socket.on('moz', function (data) {
//			
//			console.log(data);
//			maps.mozMarkers(data);
//			
//		});
		
		socket.on('bbq', function (data) {
			console.log('bbq data :)');
			console.log('bbq', data);
		});
		
	}
	
	// HTTP Request function
	function http(url, dest) {
		
		var loader = document.getElementById('loader'),
			progress = document.getElementById('loader-progress'),
			message = document.getElementById('loader-message');
		
		var xhttp = new XMLHttpRequest();
		xhttp.onprogress = function(e) {
			loader.classList.remove('hidden');
			message.innerHTML = 'Downloading data..';
			if (e.lengthComputable) {
				progress.max = e.total;
				progress.value = e.loaded;
				if (e.total === e.loaded) {
					loader.classList.add('hidden');
				}
			}
		};
		xhttp.onreadystatechange = function () {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
       			var data = JSON.parse(xhttp.responseText);
				console.log(data);
				if (dest === 'OC') {
					maps.radioMarkers(data);
					maps.addHeat(data);
				} else if (dest === 'Moz') {
					maps.mozMarkers(data);
					maps.addHeat(data);
				}
			}
		};
		xhttp.open('GET', url, true);
		xhttp.send();
		
	}
	
	
	return {
		socket: socket,
		socketInit: socketInit,
		http: http
	};
	
	
}());