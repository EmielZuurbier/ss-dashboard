var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Account = new Schema({
	username:	String,
	password:	String,
	email:		String,
	picture:	String
});

module.exports = mongoose.model('account', Account);