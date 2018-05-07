var express = require('express');
var router = express.Router();
const { Cards, Games, UsersGames, GamesCards } = require('../database');
const auth = require('../auth/requireAuthentication');

// GET /lobby -- Player visits the lobby
router.get('/', (request, response, next) => {
  Games.getAllGames()
    .then(games => {
      response.render('lobby', {
        title: 'UNO - Lobby',
        username: request.user.username,
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

// POST /lobby/message -- Player sends a message in the lobby
router.post('/message', (request, response, next) => {
  response.render('lobby', {
    title: 'UNO - Lobby'
  });
});

module.exports = router;
