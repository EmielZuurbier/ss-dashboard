/*global document, window*/

/*

FORM.JS
AUTHOR: EMIEL ZUURBIER
COPYRIGHT: ALL RIGHTS RESERVERD

*/

(function () {
	'use strict';
	
	var input = document.querySelectorAll('input');
	
	function check(e) {
		if (!e.target.value) {
			e.target.classList.remove('used');
		} else {
			e.target.classList.add('used');
		}
	}
	
	[].forEach.call(input, function (el) {
		el.addEventListener('input', check, false);
	});
	
}());