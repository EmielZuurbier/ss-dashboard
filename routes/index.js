var express = require('express');
var router = express.Router();
var exphbs  = require('express-handlebars');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Smartsensors Dashboard' });
});

module.exports = router;
