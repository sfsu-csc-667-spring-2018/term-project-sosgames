const express = require('express');
const router = express.Router();
const requireAuthentication = require('../auth/requireAuthentication');

router.get('/', requireAuthentication, (request, response, next) => {
  // From jrob 
  // const { user } = request;
  // response.render('lobby', { user });

  response.render('lobby', {
    title: 'UNO - Lobby'
  });
});

module.exports = router;