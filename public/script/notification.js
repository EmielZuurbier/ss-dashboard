/*global notification, console, document, Notification*/

/*

NOTIFICATION.JS
AUTHOR: EMIEL ZUURBIER
COPYRIGHT: ALL RIGHTS RESERVERD

*/

var notify = (function () {
	'use strict';
	
	if (!('Notification' in window)) {
		console.warn("Notifications are not supported in this browser");
	}
	
	if (Notification.permission !== 'denied') {
		Notification.requestPermission();
	}
	
	function push(title, body, data, tag, icon) {
		
		// Set options
		var options = {
			body: body,
			data: data,
			tag: tag,
			icon: icon
		},
		
		// Fire new notification
			n = new Notification(title, options);
	}
	
	return {
		push: push
	};
	
}());