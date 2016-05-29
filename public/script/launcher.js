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
	
	// Get current postiton and render map
	maps.position();
	
//	CSV.decode('./data/testdata.csv');
	
}());