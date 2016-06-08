/*global console, maps, graph*/

/*

LAUNCHER.JS
AUTHOR: EMIEL ZUURBIER
COPYRIGHT: ALL RIGHTS RESERVED

*/

var launcher = (function () {
	'use strict';
	
	// Start up socket
	data.socketInit();
	
	// Request data from sources
	data.http('http://localhost:3000/oc', 'OC');
	data.http('http://localhost:3000/moz', 'Moz');
	
	// Get current postiton and render map
	maps.position();
	
}());