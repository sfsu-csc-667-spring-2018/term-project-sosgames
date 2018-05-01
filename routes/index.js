const express = require('express');
const router = express.Router();
const requireAuthentication = require('../auth/requireAuthentication');

router.get('/', requireAuthentication, (request, response, next) => {
  // From jrob 
  // const { user } = request;
  // response.render('lobby', { user });
  // I think we shouldn't use requireAuthentication here
  // We should call a "isAuthenticated" method, and display render
  // either the login or lobby - we should use the requireAuthentication
  // method for all of the other pages, this way if we're not authenticated
  // it would redirect to login instead of like create game and flash a message
  // what do you think?
  response.render('lobby', {
    title: 'UNO - Lobby'
  });
});

module.exports = router;