var express = require('express');
var router = express.Router();
var exphbs  = require('express-handlebars');
var Data = require('../modules/database');
var mongoose = require('mongoose');
var configDB = require('../config/database');

var db = mongoose.connection;

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Smartsensors Dashboard' });
});

router.get('/oc', function (req, res, next) {
	
	// Find data from OC Collection
	Data.Radio.find({}, function (err, collection) {
		if (err) throw err;
		res.send(collection);
	});
	
});

router.get('/moz', function (req, res, next) {
	
	// Find data from Moz collection
	Data.Moz.find({}, function (err, collection) {
		if (err) throw err;
		res.send(collection);
	});
	
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/admin');
}

module.exports = router;
