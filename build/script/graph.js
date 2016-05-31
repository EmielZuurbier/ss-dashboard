

/*

GRAPH.JS
AUTHOR: EMIEL ZUURBIER
COPYRIGHT: ALL RIGHTS RESERVERD

*/

var graph = (function () {
	'use strict';
	
	function line(data) {
		
		// Create labels and series
		var labels = [],
			series = [];
		
		// Split the JSON data
		data.forEach(function (field) {
			if (field.averageSignal !== 0 && field.averageSignal !== "") {
				labels.push(new Date(field.updated).getDate() + '-' + (new Date(field.updated).getMonth() + 1));
				series.push(field.averageSignal + (field.averageSignal * -2));
			}
		});
		
//		labels = labels.slice(-10);
//		series = series.slice(-10);
				
		// Create new line graph
		var lineGraph = new Chartist.Line('#line-graph', {
			labels: labels,
			series: [series]
		}, {
			high: 125,
			low: 50,
			showArea: true,
			showLine: false,
			showPoint: false,
			fullWidth: true,
			axisX: {
				showGrid: false,
				showLabel: false,
				offset: 0
			},
			chartPadding: 0
		});
		
	}
	
	function bar(data) {
		
		// Create labels and series
		var labels = [],
			series = [];
		
		// Split the JSON data
		data.forEach(function (field) {
			labels.push(new Date(field.updated).getDate() + '-' + (new Date(field.updated).getMonth() + 1));
			series.push(field.range);
		});
		
//		labels = labels.slice(-10);
//		series = series.slice(-10);
		
		var barGraph = new Chartist.Bar('#bar-graph', {
			labels: labels,
			series: [series]
		},{
			fullWidth: true,
			axisX: {
    			labelInterpolationFnc: function(value, index) {
      				return index % 2 === 0 ? value : null;
    			},
				showGrid: false,
				showLabel: false,
				offset: 0
  			},
			chartPadding: 0
		});
		
	}
	
	return {
		line: line,
		bar: bar
	};
	
}());