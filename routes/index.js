const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'UNO' });
});

router.get('/lobby', function( req, res, next ) {
  res.render('lobby', { title: 'UNO - Lobby' });
});

router.get('/create-game', function( req, res, next ) {
    res.render('creategame', { title: 'UNO - Create Game' });
});

router.get('/end-game-page', function( req, res, next ) {
  res.render('endgamepage', { title: 'UNO - End Game' });
});

module.exports = router;
