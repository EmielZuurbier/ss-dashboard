/*global L, alert, console, document, navigator, geolocation*/

/*

MAP.JS
AUTHOR: EMIEL ZUURBIER
COPYRIGHT: ALL RIGHTS RESERVERD

*/

var maps = (function () {
	'use strict';
	
	if (!('geolocation' in navigator)) {
		console.warn('Geolocation is not supported in this browser');
	}
	
	// Get map element
	var mapContainer = document.getElementById('map'),
		
		markers = L.featureGroup(),
		
		// Heatlayer
		heat = L.heatLayer([], {
			max: 1.0,
			radius: 25
		}),
		
		// Clustergroup
		cluster = L.markerClusterGroup({
			polygonOptions: {
				fillColor: '#ABCE59',
				color: '#ABCE59',
				weight: 2,
				opacity: 1,
				fillOpacity: 0.5
			},
			iconCreateFunction: function (cluster) {
				var childCount = cluster.getChildCount();
				
				return L.divIcon({
					html: '<span class="marker-counter">' + childCount + '</span>',
					iconSize: [30, 30],
					iconAnchor: [15, 15],
					className: 'marker'
				});
			}
		}),
		
		// Create user icon
		icon = L.divIcon({
			iconSize: [20, 20],
			iconAnchor: [10, 10],
			className: 'marker'
		}),
	
		// Create map
		map = L.map(mapContainer, {
			doubleClickZoom: true,
			touchZoom: true,
			zoomControl: true,
			inertia: true
		}),
	
		// Geolocation options
		options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		},
		
		 overlay = {
			"Clusters": cluster,
			"Heat": heat,
		};
	
	// Set tile layer
	L.tileLayer('https://api.mapbox.com/styles/v1/milosaurus/cioj52hzf0032cumbddvfzurm/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		attribution: 'Smartsensors',
		id: 'milosaurus.0705ip9i',
		accessToken: 'pk.eyJ1IjoibWlsb3NhdXJ1cyIsImEiOiJjaWc5N3I4bnAwOWJvdGFsdDIxZDZkYnE4In0.Ke7TOrRQQU0eBVRuv9YvZQ'
	}).addTo(map);
	
	cluster.addTo(map);
	heat.addTo(map);

	L.control.layers(null, overlay, {
		position: 'topleft'
	}).addTo(map);
	
	// Add markers to map
	function addMarkers(data) {
		
		cluster.clearLayers();
		
		// Get json data for markers
		data.forEach(function (loc) {
			var marker = new L.marker(L.latLng(loc.lat, loc.lon), {
				clickable: true,
				icon: icon
			}).bindPopup('<h3>Area: ' + loc.area + '</h3><p>Average signal: ' + (loc.averageSignal + loc.averageSignal * -2) + '<br>Radio: ' + loc.radio + '<br>Range: ' + loc.range + '<br>Area: ' + loc.area + '</p>');
			
			cluster.addLayer(marker);
		});
		
	}
	
	// Add markers from personal data
	function addAppMarkers(data) {
		
		cluster.clearLayers();
		
		data.forEach(function (loc) {
			
			if (loc.gps_lat !== null && loc.gps_lng !== null) {
				
				var marker = new L.marker(L.latLng(loc.gps_lat, loc.gps_lng), {
					clickable: true,
					icon: icon
				}).bindPopup('<p>Current time: ' + loc.current_time + '<br>Device name: ' + loc.device_name + '<br>Noise: ' + loc.noise + '<br>Lat: ' + loc.gps_lat + '<br>Lng: ' + loc.gps_lng + '<br>Cell DB: ' + loc.cell_db + '<br>Cell ASU: ' + loc.cell_asu + '<br>WLAN SSID: ' + loc.wlan_ssid + '<br>WLAN Signal: ' + loc.wlan_signal_strength + '<br>WLAN Encryption: ' + loc.wlan_encryption);
				
				cluster.addLayer(marker);
			}
		});
		
	}
	
	// Add heatmap
	function addHeat(data) {
		
		heat.redraw();
		
		data.forEach(function (loc) {
			if (loc.averageSignal !== "" && loc.averageSignal !== undefined && loc.averageSignal !== 0 && loc.averageSignal !== "0") {
				var avg = loc.averageSignal + (loc.averageSignal * -2);
				var perc = 1 / avg;
				var inten = perc * 100;
//				console.log('perc: ' + perc, 'inten: ' + inten);
				heat.addLatLng([loc.lat, loc.lon, 1]);
			}
		});
		
	}
		
	// Set location on map
	function locate(result) {
		
		// Store coords
		var coords = result.coords
		
		// Save data in maps object
		maps.coords = {
			lat: coords.latitude,
			lng: coords.longitude,
			acc: coords.accuracy
		};
		
		// Send geolocation data to server
		data.socket.emit('geolocation', maps.coords);
		
		// Move to location
		map.setView([coords.latitude, coords.longitude], 10);
				
		// Save coordinates
		localStorage.setItem('latitude', coords.latitude);
		localStorage.setItem('longitude', coords.longitude);

	}
	
	// Error handler
	function error(err) {
		
		console.error('Geolocation Error(' + err.code + '): ' + err.message);
		
		// Check if a position is stored
		if (localStorage.getItem('latitude') !== null && localStorage.getItem('longitude') !== null) {
			var lat = parseFloat(localStorage.getItem('latitude')),
				lng = parseFloat(localStorage.getItem('longitude'));
			
			// Set the view
			map.setView([lat, lng], 10);
			
			console.info('Last saved position is now used');
		} else {
			console.warn('No saved position is found, please check the geolocation settings of your device');
			console.info('Default position "Amsterdam" is used');
          	map.setView([52.373911, 4.891141], 10);
		}
	
	}
	
	// Get current position
	function getPosition() {
		
		// Get geolocation current position
		navigator.geolocation.getCurrentPosition(locate, error, options);
		
	}
	
	// Return object
	return {
		map: map,
		position: getPosition,
		addMarkers: addMarkers,
		addAppMarkers: addAppMarkers,
		addHeat: addHeat
	};
	
}());