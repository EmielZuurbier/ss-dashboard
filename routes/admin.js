var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('login', { title: 'Admin Dashboard', layout: 'admin-layout', auth: req.isAuthenticated(), user: req.user });
});

router.get('/register', function(req, res, next) {
	res.render('register', { title: 'Register', path: '../', layout: 'admin-layout' });
});

router.get('/logout', function(req, res, next) {
	req.logout();
    res.redirect('/admin');
});

router.post('/register/registered', passport.authenticate('local-signup', {
	successRedirect : '/', // redirect to the secure profile section
	failureRedirect : 'admin/register', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));

router.post('/login', passport.authenticate('local-login', {
	successRedirect : '/', // redirect to the secure profile section
	failureRedirect : '/admin', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/admin');
}

module.exports = router;
