var express = require('express');
var router = express.Router();

// GET /lobby -- Player visits the lobby
router.get('/', (request, response, next) => {
  response.render('lobby', {
    title: 'UNO - Lobby'
  });
});

// POST /lobby/message -- Player sends a message in the lobby
router.post('/message', (request, response, next) => {
  response.render('lobby', {
    title: 'UNO - Lobby'
  });
});

module.exports = router;