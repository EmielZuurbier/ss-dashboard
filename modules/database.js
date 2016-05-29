var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Radio = new Schema({
	radio:		String,
	mcc: 		Number,
	net: 		Number,
	area: 		Number,
	cell:		Number,
	unit:		Number,
	lon:		Number,
	lat:		Number,
	range:		Number,
	samples:	Number,
	changeable:	Number,
	created:	Date,
	updated:	Date,
	avgSignal:	Number,
});

module.exports = mongoose.model('radio', Radio);