var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// RadioFQ Schema
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
	averageSignal:	Number,
});

// User Schema
var Account = new Schema({
	username:	String,
	password:	String,
	email:		String,
	picture:	String,
	admin:		Boolean,
	created:	Date,
	lastlog:	Date
});

Account.methods.validPassword = function(pwd) {
    return (this.password === pwd);
};

module.exports = {
	'Radio': mongoose.model('radio', Radio),
	'Account': mongoose.model('account', Account)
};