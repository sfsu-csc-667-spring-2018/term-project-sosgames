var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'UNO' });
});

router.get('/signup', function( req, res, next ) {
  res.render('signup', { title: 'UNO - Sign Up' });
});

module.exports = router;
