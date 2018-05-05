const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('../auth');
const { User } = require('../database');

router.get('/', (request, response, next) => {
  response.render('login', {
    title: 'UNO'
  });
});

router.post('/', (request, response, next) => {
  passport.authenticate('local', {
    successRedirect: '/lobby',
    failureRedirect: '/login',
    failureFlash: true
  })(request, response, next);
});

module.exports = router;
