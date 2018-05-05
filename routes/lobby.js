var express = require('express');
var router = express.Router();
const auth = require('../auth/requireAuthentication');

// GET /lobby -- Player visits the lobby
router.get('/', auth.requireAuthentication, (request, response, next) => {
  console.log(request.user);
  response.render('lobby', {
    title: 'UNO - Lobby',
    username: request.user.username
  });
});

// POST /lobby/message -- Player sends a message in the lobby
router.post('/message', (request, response, next) => {
  response.render('lobby', {
    title: 'UNO - Lobby'
  });
});

module.exports = router;
