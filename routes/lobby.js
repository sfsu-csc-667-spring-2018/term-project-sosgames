var express = require('express');
var router = express.Router();
const { User, Games } = require('../database');
const auth = require('../auth/requireAuthentication');

router.get('/', auth.requireAuthentication, (request, response, next) => {
  Promise.all([User.getTopTenScores(), Games.getAllGames()])
    .then(([scores, games]) => {
      response.render('lobby', {
        title: 'UNO - Lobby',
        username: request.user.username,
        scores: scores,
        games: games
      });
    })
    .catch(error => {
      response.render('lobby', {
        title: 'UNO - Lobby',
        username: request.user.username
      });
    });
});

router.post('/message', (request, response, next) => {
  response.render('lobby', {
    title: 'UNO - Lobby'
  });
});

module.exports = router;
