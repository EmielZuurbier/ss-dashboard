/*global console, document*/

/*

ROUTER.JS
AUTHOR: EMIEL ZUURBIER
COPYRIGHT: ALL RIGHTS RESERVED

*/

var navigation = (function () {
	'use strict';
	
	// Get all nav buttons and sections
	var navs = document.querySelectorAll('.navigation-button');
	var pages = document.querySelectorAll('.page');
		
	// Select the matching section
	function go(id) {
		
		// Set all sections to hide
		[].forEach.call(pages, function (page) {
			page.classList.remove('active');
		});
		
		// Add active class to corresponding section
		document.getElementById(id).classList.add('active');
		
	}
	
	// Nav button function
	function select(e) {
		
		// Get id from clicked menu item
		var hash = this.getAttribute('href'),
			split = hash.split('#'),
			id = split[1];
		
		// Remove active classes from all nav buttons
		[].forEach.call(navs, function (nav) {
			nav.classList.remove('active');
		});
		
		// Add active class to selected nav button
		this.classList.add('active');
		
		// Get the matching section
		go(id);
		
		e.preventDefault();
		
	}
	
	// Add eventlistener for links
	[].forEach.call(navs, function (nav) {
		nav.addEventListener('click', select, false);
	});
	
	return {
		go: go
	};
	
}());