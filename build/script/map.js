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
		
		tmobileLayer = L.layerGroup(),
		
		// Clustergroup
		clusterOC = L.markerClusterGroup({
			spiderfyOnMaxZoom: false,
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
		
		clusterUser = L.markerClusterGroup({
//			disableClusteringAtZoom: 18,
//			spiderfyOnMaxZoom: false,
			polygonOptions: {
				fillColor: '#f05b4f',
				color: '#f05b4f',
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
					className: 'marker mobile'
				});
			}
		}),
		
		clusterMoz = L.markerClusterGroup({
			spiderfyOnMaxZoom: false,
			polygonOptions: {
				fillColor: '#4feaf0',
				color: '#4feaf0',
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
					className: 'marker moz'
				});
			}
		}),
		
		// Create user icon
		iconR = L.divIcon({
			iconSize: [20, 20],
			iconAnchor: [10, 10],
			className: 'marker'
		}),
		
		// Create user icon
		iconM = L.divIcon({
			iconSize: [20, 20],
			iconAnchor: [10, 10],
			className: 'marker mobile'
		}),
		
		// Create user icon
		iconMoz = L.divIcon({
			iconSize: [20, 20],
			iconAnchor: [10, 10],
			className: 'marker moz'
		}),
		
		iconTmobile = L.icon({
			iconUrl: '../media/icons/tmobile.png',
			iconSize: [50, 50],
			iconAnchor: [25, 25]
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
		
		// Layer switches
		overlay = {
			"OpenCell data": clusterOC,
			"Mozilla data": clusterMoz,
			"User data": clusterUser,
			"T-mobile": tmobileLayer,
			"Heatmap": heat
		};
	
	// Set tile layer
	L.tileLayer('https://api.mapbox.com/styles/v1/milosaurus/cioj52hzf0032cumbddvfzurm/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		attribution: 'Smartsensors',
		id: 'milosaurus.0705ip9i',
		accessToken: 'pk.eyJ1IjoibWlsb3NhdXJ1cyIsImEiOiJjaWc5N3I4bnAwOWJvdGFsdDIxZDZkYnE4In0.Ke7TOrRQQU0eBVRuv9YvZQ'
	}).addTo(map);
	
	clusterOC.addTo(map);
	clusterUser.addTo(map);
	clusterMoz.addTo(map);
	tmobileLayer.addTo(map);
	heat.addTo(map);

	L.control.layers(null, overlay, {
		position: 'topleft'
	}).addTo(map);
		
	// Add markers to map
	function radioMarkers(data) {
		
		clusterOC.clearLayers();
		
		// Get json data for markers
		data.forEach(function (loc) {
			var marker = new L.marker(L.latLng(loc.lat, loc.lon), {
				clickable: true,
				icon: iconR
			}).bindPopup('<p>Area: ' + loc.area + '<br>Average signal: ' + loc.averageSignal + '<br>Cell: ' + loc.cell + '<br>Changeable: ' + loc.changeable + '<br>Created: ' + loc.created + '<br>Lat: ' + loc.lat + '<br>Lon: ' + loc.lon + '<br>MCC: ' + loc.mcc + '<br>Net: ' + loc.net + '<br>Radio: ' + loc.radio + '<br>Range: ' + loc.range + '<br>Samples: ' + loc.samples + '<br>Unit: ' + loc.unit + '<br>Updated: ' + loc.updated + '</p>');
			
			clusterOC.addLayer(marker);
		});
		
	}
	
	// Add markers to map
	function mozMarkers(data) {
		
		clusterMoz.clearLayers();
		
		// Get json data for markers
		data.forEach(function (loc) {
			var marker = new L.marker(L.latLng(loc.lat, loc.lon), {
				clickable: true,
				icon: iconMoz
			}).bindPopup('<p>Area: ' + loc.area + '<br>Average signal: ' + loc.averageSignal + '<br>Cell: ' + loc.cell + '<br>Changeable: ' + loc.changeable + '<br>Created: ' + loc.created + '<br>Lat: ' + loc.lat + '<br>Lon: ' + loc.lon + '<br>MCC: ' + loc.mcc + '<br>Net: ' + loc.net + '<br>Radio: ' + loc.radio + '<br>Range: ' + loc.range + '<br>Samples: ' + loc.samples + '<br>Unit: ' + loc.unit + '<br>Updated: ' + loc.updated + '</p>');
			
			clusterMoz.addLayer(marker);
		});
		
	}
	
	// Add markers from personal data
	function userMarkers(data) {
		
		clusterUser.clearLayers();
		
		data.forEach(function (loc) {
			
			if (loc.lat !== null && loc.lng !== null) {
				
				var marker = new L.marker(L.latLng(loc.lat, loc.lng), {
					clickable: true,
					icon: iconM
				}).bindPopup('<p>Current time: ' + loc.currentTime + '<br>Device name: ' + loc.deviceName + '<br>Noise: ' + loc.noise + '<br>Lat: ' + loc.lat + '<br>Lng: ' + loc.lng + '<br>Cell DB: ' + loc.cellDb + '<br>Cell ASU: ' + loc.cellAsu + '<br>WLAN SSID: ' + loc.wlanSsid + '<br>WLAN Signal: ' + loc.wlanStrength + '<br>WLAN Encryption: ' + loc.wlanEncryption);
				
				clusterUser.addLayer(marker);
			}
			
		});
		
	}
	
	// Add heatmap
	function addHeat(data) {
		
		heat.redraw();
		
		data.forEach(function (loc) {
			
//			if (loc.averageSignal !== "" && loc.averageSignal !== undefined && loc.averageSignal !== 0 && loc.averageSignal !== "0") {
				var avg = loc.averageSignal + (loc.averageSignal * -2);
				var perc = 1 / avg;
				var inten = perc * 100;
//				console.log('perc: ' + perc, 'inten: ' + inten);
				heat.addLatLng([loc.lat, loc.lon, 1]);
//			}
			
		});
		
	}
	
	function tmobileMarkers(data) {
		
		tmobileLayer.clearLayers();
		
		var marker = new L.Marker(L.latLng(52.3144, 4.942), {
			clickable: true,
			icon: iconTmobile
		});
		
		tmobileLayer.addLayer(marker);
		
	}
		
	// Set location on map
	function locate(result) {
		
		// Store coords
		var coords = result.coords;
		
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
		radioMarkers: radioMarkers,
		userMarkers: userMarkers,
		mozMarkers: mozMarkers,
		tmobileMarkers: tmobileMarkers,
		addHeat: addHeat
	};
	
}());