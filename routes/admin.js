var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('login', { title: 'Admin Dashboard', layout: 'admin-layout' });
});

router.get('/register', function(req, res, next) {
	res.render('register', { title: 'Register', style: '../', layout: 'admin-layout' });
})

module.exports = router;
