var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'UNO' });
});

router.get('/signup', function( req, res, next ) {
  res.render('signup', { title: 'UNO - Sign Up' });
});

router.get('/create-game', function( req, res, next ) {
    res.render('creategame', { title: 'UNO - Create Game' });
});

router.get('/end-game-page', function( req, res, next ) {
  res.render('endgamepage', { title: 'UNO - End Game' });
});

module.exports = router;
